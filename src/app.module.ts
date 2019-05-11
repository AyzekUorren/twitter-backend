import { UtilsModule } from './modules/utils/utils.module';
import { AuthModule } from './modules/auth/auth.module';
import { TagModule } from './modules/tag/tag.module';
import { TwetModule } from './modules/twet/twet.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './modules/config/config.module';
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
