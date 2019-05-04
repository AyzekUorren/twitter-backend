import { UserDto } from '../user/dto/user.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken (userDto: UserDto) {
    const SignInuser = await this.userService.findByEmail(userDto.email);
    if (!SignInuser) {
      Logger.error('auth->createToken: User not found');
      throw new UnauthorizedException('User not found');
    }
    const user: JwtPayload = { email: SignInuser.email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser (payload: JwtPayload): Promise<any> {
    if (!payload.email) {
      Logger.error('auth-> validateUser: Token not valid');
      throw new UnauthorizedException('Token not valid');
    }

    const user = await this.userService.findByEmail(
      payload.email.toLowerCase(),
    );
    if (!user) {
      Logger.error('auth-> validateUser: User not found');
      throw new UnauthorizedException('User not found');
    }

    return { id: user.id, email: user.email };
  }
}
