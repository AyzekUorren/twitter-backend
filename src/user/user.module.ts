import { TagModule } from '../modules/tag/tag.module';
import { TwetModule } from '../modules/twet/twet.module';
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UtilsModule } from '../main/helpers/utils.module';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => TwetModule),
        forwardRef(() => TagModule),
        forwardRef(() => UtilsModule),
    ],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [UserService],
})
export class UserModule {}
