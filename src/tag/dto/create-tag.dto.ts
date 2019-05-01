import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class CreateTagDto {
    @ApiModelProperty({
        required: true,
        type: String,
        example: new Date().toString(),
    })
    readonly createdAt: string;

    @ApiModelProperty({
        required: true,
        type: String,
        example: new Date().toString(),
    })
    readonly updatedAt: string;

    @IsString()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'Tag Name',
    })
    readonly name: string;

    @IsString()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'This tag is used as an example.',
    })
    readonly description: string;

    @IsMongoId()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'MongoId',
    })
    readonly author: string;
}
