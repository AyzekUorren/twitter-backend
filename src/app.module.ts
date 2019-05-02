import { TagModule } from './tag/tag.module';
import { TwetModule } from './twet/twet.module';
import { MigrationModule } from './migrations/migrations.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
@Module({
	imports: [ ConfigModule, DatabaseModule, UserModule, TwetModule, TagModule ],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
