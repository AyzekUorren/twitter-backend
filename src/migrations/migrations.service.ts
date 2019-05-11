import { MigrationDto } from './dto/migration.dto';
import { Migration } from './interfaces/migration.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MigrationService {
    constructor(
        @Inject('MIGRATION_MODEL') private readonly migration: Model<Migration>,
    ) {}

    async create(createMigrationDto: MigrationDto): Promise<Migration> {
        const createdMigration = new this.migration(createMigrationDto);
        return await createdMigration.save();
    }

    async findLast(): Promise<Migration> {
        return await this.migration.findOne({ last: -1 }).exec();
    }

    async findAll(): Promise<Migration[]> {
        return await this.migration.find().exec();
    }
}
