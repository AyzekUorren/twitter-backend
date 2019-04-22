import * as mongoose from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        imports: [ConfigModule],
        useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
            await mongoose.connect(config.get('MONGO_URL'), { useNewUrlParser: true }),
            inject: [ConfigService],
    },
];
