import { UtilsModule } from '../utils/utils.module';
import { TagModule } from './../tag/tag.module';
import { UserModule } from './../user/user.module';
import { TwetService } from './twet.service';
import { TwetController } from './twet.controller';
import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TwetProviders } from './twet.providers';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => UserModule),
        forwardRef(() => TagModule),
        forwardRef(() => UtilsModule),
    ],
    controllers: [TwetController],
    providers: [TwetService, ...TwetProviders],
    exports: [TwetService],
})
export class TwetModule {}
