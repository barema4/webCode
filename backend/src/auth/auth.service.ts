import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (!isEmail(email)) {
      throw new BadRequestException('Please enter a valid email');
    }

    if (password.length < 6 || password.length > 50) {
      throw new BadRequestException(
        'Password length must be between 6 and 50 characters.',
      );
    }

    if (!/\d/.test(password)) {
      throw new BadRequestException(
        'Password must contain at least one number',
      );
    }
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(req) {
    const { email, password } = req.body;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
