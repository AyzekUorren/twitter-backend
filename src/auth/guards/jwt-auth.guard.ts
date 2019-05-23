import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const requestheaders = context.switchToHttp().getRequest().headers
            .authorization;

        if (!requestheaders) {
            Logger.error('jwt-guard->init: authorization token not found');
            throw new UnauthorizedException('authorization token not found');
        }

        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            Logger.error(err, user, info);
            Logger.error('jwt-guard->handleRequest: user not found');
            throw err || new UnauthorizedException('user not found');
        }
        return user;
    }
}
