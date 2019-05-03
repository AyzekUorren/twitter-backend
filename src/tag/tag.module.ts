import { TagProviders } from './tag.providers';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports:
        [
            DatabaseModule,
            UserModule,
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
