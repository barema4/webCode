import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import { Photo } from '../photo/entities/photo.entity';
import { isEmail } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async register(createUserDto: CreateUserDto, images: Express.Multer.File[]) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('User with this email already exists.');
      }

      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'password',
        'role',
      ];
      if (requiredFields.some((field) => !createUserDto[field])) {
        throw new BadRequestException('Please provide all required fields.');
      }

      if (
        createUserDto.firstName.length < 2 ||
        createUserDto.firstName.length > 25
      ) {
        throw new BadRequestException(
          'firstName length must be between 2 and 25 characters',
        );
      }

      if (
        createUserDto.lastName.length < 2 ||
        createUserDto.lastName.length > 25
      ) {
        throw new BadRequestException(
          'lastName length must be between 2 and 25 characters',
        );
      }

      if (!isEmail(createUserDto.email)) {
        throw new BadRequestException('Please enter a valid email');
      }

      if (
        createUserDto.password.length < 6 ||
        createUserDto.password.length > 50
      ) {
        throw new BadRequestException(
          'Password length must be between 6 and 50 characters.',
        );
      }

      if (!/\d/.test(createUserDto.password)) {
        throw new BadRequestException(
          'Password must contain at least one number',
        );
      }

      const nameRegex = /^[a-zA-Z\s]*$/;
      if (
        !nameRegex.test(createUserDto.firstName) ||
        !nameRegex.test(createUserDto.lastName)
      ) {
        throw new BadRequestException('Invalid firstName or lastName format.');
      }

      if (images.length < 4) {
        throw new BadRequestException('Please upload at least 4 images.');
      }

      const user = this.userRepository.create(createUserDto);
      user.password = await bcrypt.hash(createUserDto.password, 10);

      const client = new Client();
      client.user = user;
      client.fullName = `${createUserDto.firstName} ${createUserDto.lastName}`;
      client.avatar =
        'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg';

      const uploadedImageURLs = await Promise.all(
        images.map(async (image) => {
          const imageName = `image_${uuidv4()}.jpg`;
          const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          });

          const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: imageName,
            Body: image.buffer,
            ACL: 'public-read',
          };

          const result = await s3.upload(uploadParams).promise();
          return result.Location;
        }),
      );
      const savedUser = await this.userRepository.save(user);

      const photo = new Photo();
      photo.name = uuidv4();
      photo.user = user;

      const mapedImagedPromises: Promise<number>[] = uploadedImageURLs.map(
        async (uploadedImageURL) => {
          photo.url = uploadedImageURL;
          const photoResponse = await this.photoRepository.save(photo);
          return photoResponse.id;
        },
      );

      const mapedImaged = await Promise.all(mapedImagedPromises);
      client.photos = mapedImaged;

      await this.clientRepository.save(client);

      return {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        role: savedUser.role,
        active: savedUser.active,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async getUserById(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'active',
        'createdAt',
      ],
    };
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
