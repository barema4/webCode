import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { ClientRepository } from 'src/client/client.repository';
import { PhotoRepository } from 'src/photo/photo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ClientRepository,
      PhotoRepository,
      User,
      Client,
      Photo,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
