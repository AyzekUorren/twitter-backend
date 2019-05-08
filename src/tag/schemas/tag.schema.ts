import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
    createdAt: String,
    updatedAt: String,
    name: String,
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
