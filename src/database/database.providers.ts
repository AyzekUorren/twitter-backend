import * as mongoose from 'mongoose';
const mongourl = process.env.DB_URL || `mongodb://localhost/twitter-app-backend`;

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect(mongourl),
    },
];
