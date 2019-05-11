import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmpty } from 'class-validator';

export class TagDto {
    @IsEmpty() createdAt: string;
    @IsEmpty() updatedAt: string;

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

    @IsEmpty() author: string;
}
