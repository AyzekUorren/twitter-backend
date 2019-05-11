import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmpty, IsOptional } from 'class-validator';

export class TagUpdateDto {
    @IsEmpty() updatedAt: string;
    @IsEmpty() createdAt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Tag Name',
    })
    readonly name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'This tag is used as an example.',
    })
    readonly description: string;
}
