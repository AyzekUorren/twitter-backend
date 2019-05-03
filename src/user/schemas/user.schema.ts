import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    link: String,
    createdAt: String,
    updatedAt: String,
    firstName: String,
    middleName: String,
    lastName: String,
    password: String,
    email: String,
    twets:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Twet',
            },
        ],
    tags:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag',
            },
        ],
});
