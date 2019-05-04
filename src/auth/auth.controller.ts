import { UserDto } from '../user/dto/user.dto';
import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthUserDto } from '../user/dto/auth-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('signIn')
  async createToken (@Body() authUser: AuthUserDto) {
    return await this.authService.createToken(authUser);
  }

  @Post('signUp')
  async signUp (@Body() createUserDto: UserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser (@Req() request) {
    return {
      twets: request.user.twets,
      tags: request.user.tags,
      id: request.user._id,
      firstName: request.user.firstName,
      middleName: request.user.middleName,
      lastName: request.user.lastName,
      password: request.user.password,
      email: request.user.email,
      updatedAt: request.user.updatedAt,
      createdAt: request.user.createdAt,
    };
  }
}
