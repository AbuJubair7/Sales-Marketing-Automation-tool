import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const user = await this.userService.create(createAuthDto);
    user.password = '';
    const token = await this.signToken(user.id, user.email, user.role);
    if (!token) throw new UnauthorizedException('Token error!');
    return { user, token };
  }

  async singIn(data: any) {
    const user = await this.userService.findOne(data.email);

    if (user && (await bcrypt.compare(data.password, user.password))) {
      const token = await this.signToken(user.id, user.email, user.role);
      return { user, token };
    }
    throw new UnauthorizedException('Email or password error!');
  }

  async signToken(userId: number, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const secretKey = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secretKey,
    });
    return token;
  }
}
