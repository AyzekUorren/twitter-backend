import { AbstractResponseDto } from '../../utils/dto/abstract-response.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TagResponseDto extends AbstractResponseDto {
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
        example: 'Tag Name',
    })
    readonly name: string;
    @IsString()
    @IsOptional()
    @ApiModelProperty({
        required: false,
        type: String,
        example: 'This tag is used as an example.',
    })
    readonly description: string;
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
        example: 'Author name',
    })
    readonly id: string;

    constructor(data: any) {
        super();
        AbstractResponseDto.SetValueIfExists(this, data, 'createdAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'updatedAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'name');
        AbstractResponseDto.SetValueIfExists(this, data, 'description');
        AbstractResponseDto.SetValueIfExists(this, data, 'author');
        AbstractResponseDto.SetValueIfExists(this, data, 'id');
    }
}
