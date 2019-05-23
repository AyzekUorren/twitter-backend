import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmpty } from 'class-validator';

export class TwetDto {
    @IsEmpty() createdAt: string;
    @IsEmpty() updatedAt: string;

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

    @IsEmpty() author: string;
}
