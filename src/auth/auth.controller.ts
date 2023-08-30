import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: CreateAuthDto) {
    return this.authService.login(req);
  }
}
