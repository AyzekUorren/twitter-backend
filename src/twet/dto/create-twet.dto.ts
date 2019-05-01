import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTwettDto {
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
        example: 'Twett Name',
    })
    readonly name: string;

    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        default: '',
        example: 'site.com/image.jpg',
    })
    readonly link: string;

    @IsString()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'Twett comment.',
    })
    readonly content: string;

    readonly tags: string[];

    readonly author: string;
}
