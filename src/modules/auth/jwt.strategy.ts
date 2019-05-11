import { ConfigService } from '../config/config.service';
import {
    Injectable,
    UnauthorizedException,
    Logger,
    Inject,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        @Inject(ConfigService) config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET') || 'secretKey',
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            Logger.error('jwt.strategy->validate: User unauthorized');
            throw new UnauthorizedException('User unauthorized');
        }
        return user;
    }
}
