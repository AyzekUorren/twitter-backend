import { TagProviders } from './tag.providers';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { UserModule } from '../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:
    [
      DatabaseModule,
      forwardRef(() => UserModule),
    ],
  controllers:
    [
      TagController,
    ],
  providers:
    [
      TagService,
      ...TagProviders,
    ],
  exports:
    [
      TagService,
    ],
})
export class TagModule {}
