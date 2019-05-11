import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserAuthDto {
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'password12345',
    })
    readonly password: string;

    @ApiModelProperty({
        required: true,
        type: String,
        example: 'example@mail.com',
    })
    readonly username: string;
}
