import { MigrationSchema } from './schemas/migration.schema';
import { Connection } from 'mongoose';

export const MigrationProviders = [
    {
        provide: 'MIGRATION_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Migration', MigrationSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
