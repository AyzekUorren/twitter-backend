import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async createToken(@Body() email, password): Promise<any> {
        return await this.authService.createToken(email);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        // this route is restricted by AuthGuard
        // JWT strategy
    }
}
