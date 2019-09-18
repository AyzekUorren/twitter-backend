import { mongo } from 'mongoose';
import { BadRequestException, Logger } from '@nestjs/common';

export class UtilsService {
    public static validateObjectId(objectId: string) {
        if (!mongo.ObjectID.isValid(objectId)) {
            Logger.error(objectId);
            throw new BadRequestException(`ObjectId is not valid ${objectId}`);
        }
    }

    public static checkModel(
        expresion: any,
        message: string = 'model not found',
        path: string = 'undefined',
    ) {
        const expresionCheck = !!expresion;
        if (!expresionCheck) {
            Logger.error(`${path}: ${message}`);
            throw new BadRequestException(message);
        }
    }
}
