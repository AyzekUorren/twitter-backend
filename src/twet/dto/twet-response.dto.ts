import { AbstractResponseDto } from '../../utils/dto/abstract-response.dto';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TwetResponseDto extends AbstractResponseDto {
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example:
            'Wed Sep 18 2019 12:16:28 GMT+0300 (Eastern European Summer Time)',
    })
    readonly createdAt: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example:
            'Wed Sep 18 2019 12:16:28 GMT+0300 (Eastern European Summer Time)',
    })
    readonly updatedAt: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Twet Name',
    })
    readonly name: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'twet_link.com/image.jpg',
    })
    readonly link: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Some text',
    })
    readonly content: string;
    @IsArray()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: [String],
        example: ['Tag id 1', 'Tag id 2'],
    })
    readonly tags: string[];
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Author name',
    })
    readonly author: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Twet id',
    })
    readonly id: string;

    constructor(data: any) {
        super();
        AbstractResponseDto.SetValueIfExists(this, data, 'createdAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'updatedAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'name');
        AbstractResponseDto.SetValueIfExists(this, data, 'link');
        AbstractResponseDto.SetValueIfExists(this, data, 'content');
        AbstractResponseDto.SetValueIfExists(this, data, 'tags');
        AbstractResponseDto.SetValueIfExists(this, data, 'author');
        AbstractResponseDto.SetValueIfExists(this, data, 'id');
    }
}
