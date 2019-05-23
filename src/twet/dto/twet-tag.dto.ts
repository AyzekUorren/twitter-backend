import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class TwetTagDTO {
    @IsMongoId()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'MongoId',
    })
    readonly twetId: string;

    @IsMongoId()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'MongoId',
    })
    readonly tagId: string;
}
