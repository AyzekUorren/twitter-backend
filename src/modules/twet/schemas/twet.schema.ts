import * as mongoose from 'mongoose';

export const TwetSchema = new mongoose.Schema({
    createdAt: String,
    updatedAt: String,
    name: String,
    link: String,
    content: String,
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
