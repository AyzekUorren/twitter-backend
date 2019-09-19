import { AbstractResponseDto } from './abstract-response.dto';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ApiResponseDto extends AbstractResponseDto {
    @IsString()
    @ApiModelProperty({
        type: String,
        required: true,
        example: 'ok',
    })
    readonly status: string;
    @IsString()
    @ApiModelProperty({
        type: String,
        required: true,
        example: 'description message',
    })
    readonly message: string;

    constructor(data: any) {
        super();
        AbstractResponseDto.SetValueIfExists(this, data, 'status');
        AbstractResponseDto.SetValueIfExists(this, data, 'message');
    }
}
