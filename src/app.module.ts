import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { ClientModule } from './client/client.module';
import { User } from './user/entities/user.entity';
import { Photo } from './photo/entities/photo.entity';
import { Client } from './client/entities/client.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sam',
      password: 'sam',
      database: 'users',
      entities: [User, Photo, Client],
      synchronize: true,
    }),
    UserModule,
    PhotoModule,
    ClientModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
