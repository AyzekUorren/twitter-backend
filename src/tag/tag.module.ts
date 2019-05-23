import { TagProviders } from './tag.providers';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { UserModule } from '../user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => UserModule),
        forwardRef(() => UtilsModule),
    ],
    controllers: [TagController],
    providers: [TagService, ...TagProviders],
    exports: [TagService],
})
export class TagModule {}
