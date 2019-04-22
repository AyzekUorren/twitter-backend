import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        useNewUrlParser: true,
        uri: configService.get('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
