import { Connection } from 'mongoose';
import { TwetSchema } from './schemas/twet.schema';

export const TwetProviders = [
    {
        provide: 'TWET_MODEL',
        useFactory: (connection: Connection) =>
            connection.model('Twet', TwetSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
