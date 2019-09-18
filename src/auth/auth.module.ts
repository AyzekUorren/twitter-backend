import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => ConfigModule),
        PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                return await {
                    secret: config.get('JWT_SECRET') || 'secretKey',
                    signOptions: {
                        expiresIn: 3600,
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
