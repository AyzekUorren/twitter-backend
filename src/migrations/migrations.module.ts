import { MigrationProviders } from './migrations.providers';
import { MigrationService } from './migrations.service';
import { MigrationController } from './migrations.controller';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule, ConfigModule],
    controllers: [MigrationController],
    providers: [MigrationService, ...MigrationProviders],
})
export class MigrationModule {}
