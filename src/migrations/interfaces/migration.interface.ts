import { Document } from 'mongoose';

export interface Migration extends Document {
    readonly count: number;
    readonly last: string;
    readonly currentVersion: string;
}
