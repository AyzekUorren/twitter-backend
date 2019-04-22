import * as mongoose from 'mongoose';
import { ConfigService } from 'src/config/config.service';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
            await mongoose.connect(config.get('MONGO_URL'), { useNewUrlParser: true }),
    },
];
