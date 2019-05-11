import { MigrationService } from './migrations.service';
import { Migration } from './interfaces/migration.interface';
import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateMigrationDto } from '../../dto/create-migration.dto';

@Controller('migrations')
export class MigrationController {
    constructor(private readonly migrationService: MigrationService) {}

    @Post()
    async create(@Body() createMigrationDto: CreateMigrationDto) {
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
