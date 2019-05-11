import { UtilsModule } from './main/helpers/utils.module';
import { AuthModule } from './modules/auth/auth.module';
import { TagModule } from './modules/tag/tag.module';
import { TwetModule } from './twet/twet.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
@Module({
    imports: [
        AuthModule,
        ConfigModule,
        DatabaseModule,
        UserModule,
        TwetModule,
        TagModule,
        UtilsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
