import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserTagDto {
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
    readonly tagId: string;
}
