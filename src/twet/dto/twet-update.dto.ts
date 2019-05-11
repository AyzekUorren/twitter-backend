import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmpty, IsOptional } from 'class-validator';

export class TwetUpdateDto {
    @IsEmpty() updatedAt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Twett Name',
    })
    readonly name: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        default: '',
        example: 'site.com/image.jpg',
    })
    readonly link: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Twett comment.',
    })
    readonly content: string;
}
