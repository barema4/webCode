import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('photos', 4))
  async register(
    @UploadedFiles() photos,
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return await this.userService.register(createUserDto, photos);
  }

  @Get('user/me')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Req() req) {
    return await this.userService.getUserById(req.user.sub);
  }
}
