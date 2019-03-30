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
import { userProviders } from './user/user.providers';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/twitter-app-backend'),
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
    ...userProviders,
    JwtStrategy,
  ],
})
export class AppModule {}
