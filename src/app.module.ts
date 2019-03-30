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

const mongourl = process.env.DB_URL || `mongodb://test:qqqqqq1@ds229186.mlab.com:29186/twitter-backend`;
@Module({
  imports: [
    MongooseModule.forRoot(mongourl, { useNewUrlParser: true }),
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
