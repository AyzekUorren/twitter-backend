import { Document } from 'mongoose';

export interface Twet extends Document {
    createdAt: string;
    updatedAt: string;
    readonly name: string;
    readonly link: string;
    readonly content: string;
    readonly tags: string[];
    readonly author: string;
}
