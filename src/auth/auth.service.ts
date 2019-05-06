import { UserDto } from './../user/dto/user.dto';
import { AuthUserDto } from './../user/dto/auth-user.dto';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken (authUser: AuthUserDto) {
    const SignInuser = await this.userService.findByEmail(authUser.username);
    if (!SignInuser) {
      Logger.error('auth->createToken: User not found');
      throw new UnauthorizedException('User not found');
    }
    const user: JwtPayload = { username: SignInuser.email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      access_token: accessToken,
    };
  }

  async signUp (createUserDto: UserDto) {
    const SignUpUser = await this.userService.create(createUserDto);

    if (!SignUpUser) {
      Logger.error('auth->signUp: Cannot create user');
      throw new BadRequestException('Cannot create user');
    }
    const user: JwtPayload = { username: SignUpUser.email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser (payload: JwtPayload): Promise<any> {
    if (!payload.username) {
      Logger.error('auth-> validateUser: Token not valid');
      throw new UnauthorizedException('Token not valid');
    }
    const user = await this.userService.findByEmail(
      payload.username.toLowerCase(),
    );
    if (!user) {
      Logger.error('auth-> validateUser: User not found');
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
