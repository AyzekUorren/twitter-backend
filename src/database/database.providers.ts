import * as mongoose from 'mongoose';
const mongourl = process.env.DB_URL || `mongodb://test:qqqqqq1@ds229186.mlab.com:29186/twitter-backend`;

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect(mongourl, { useNewUrlParser: true }),
    },
];
