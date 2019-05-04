import { UserDto } from '../user/dto/user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('signIn')
  async createToken (@Body() createUserDto: UserDto): Promise<any> {
    return await this.authService.createToken(createUserDto);
  }
}
