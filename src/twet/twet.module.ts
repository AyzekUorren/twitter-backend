import { UserModule } from './../user/user.module';
import { TwetService } from './twet.service';
import { TwetController } from './twet.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TwetProviders } from './twet.providers';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [TwetController],
  providers: [TwetService, ...TwetProviders],
})
export class TwetModule {}
