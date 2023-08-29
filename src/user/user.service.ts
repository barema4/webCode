/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import { Photo } from 'src/photo/entities/photo.entity';
import { isEmail } from 'class-validator';
require('dotenv').config();

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
      const options: FindOneOptions<User> = {
        where: { email: createUserDto.email },
      };
      const existingUser = await this.userRepository.findOne(options);
      if (existingUser) {
        throw new ConflictException('User with this email already exists.');
      }
      if (
        createUserDto.firstName === '' ||
        createUserDto.lastName === '' ||
        createUserDto.email === '' ||
        createUserDto.password === '' ||
        createUserDto.role === ''
      ) {
        throw new BadRequestException(
          'Please provide firstName, lastName, email, password, and role.',
        );
      }
      if (!isEmail(createUserDto.email)) {
        throw new BadRequestException('Please enter a valid email');
      }
      if (!/\d/.test(createUserDto.password)) {
        throw new BadRequestException(
          'Password must contain at least one number',
        );
      }

      // Check for valid firstName and lastName format (no numbers)
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

      // Upload images to AWS S3 and get their URLs
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
      await this.userRepository.save(user);
      // Save the Photo entities
      const photo = new Photo();
      photo.name = uuidv4();
      photo.user = user;
      // const uploadedImages = [
      //   'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg',
      //   'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg',
      //   'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg',
      //   'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg',
      // ];
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

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
