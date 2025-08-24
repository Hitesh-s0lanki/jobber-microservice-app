import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dto/token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.validateUser(email, password);

    const expires = new Date();

    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('AUTH_JWT_EXPIRATION_MS'), 10)
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
    });

    return user;
  }

  private async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });

      // Add password validation logic here (e.g., compare hashed passwords)
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException('Credentials are incorrect.');
    }
  }
}
