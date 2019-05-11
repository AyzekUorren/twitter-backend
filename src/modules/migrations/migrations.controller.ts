import { MigrationService } from './migrations.service';
import { Migration } from './interfaces/migration.interface';
import { Controller, Body, Post, Get } from '@nestjs/common';
import { MigrationDto } from '../../dto/migration.dto';

@Controller('migrations')
export class MigrationController {
    constructor(private readonly migrationService: MigrationService) {}

    @Post()
    async create(@Body() createMigrationDto: MigrationDto) {
        return this.migrationService.create(createMigrationDto);
    }

    @Get('last')
    async findLast(): Promise<Migration> {
        return this.migrationService.findLast();
    }

    @Get()
    async findAll(): Promise<Migration[]> {
        return this.migrationService.findAll();
    }
}
