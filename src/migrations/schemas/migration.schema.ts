import * as mongoose from 'mongoose';

export const MigrationSchema = new mongoose.Schema({
    count: Number,
    last: String,
    currentVersion: String,
});
