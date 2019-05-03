import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserTwetDTO {
    @IsMongoId()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'MongoId',
    })
    readonly userId: string;

    @IsMongoId()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'MongoId',
    })
    readonly twetId: string;
}
