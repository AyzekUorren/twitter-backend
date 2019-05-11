import { Document } from 'mongoose';

export interface Tag extends Document {
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name: string;
    readonly description: string;
    readonly author: string;
}
