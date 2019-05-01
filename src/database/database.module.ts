import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
