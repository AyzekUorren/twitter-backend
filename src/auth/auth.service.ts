import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    createToken(email: string): any {
        const accessToken = this.jwtService.sign(email);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async signIn(email: string): Promise<string> {
        const user: JwtPayload = { email };
        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByEmail(payload.email);
    }
}
