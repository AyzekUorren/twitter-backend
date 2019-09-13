import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        imports: [ConfigModule],
        useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
            await mongoose.connect(config.get('MONGO_URL'), {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }),
        inject: [ConfigService],
    },
];
