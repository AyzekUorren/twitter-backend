import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';
export class UserDto {
    @IsNotEmpty()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'example.com/image.jpg',
    })
    readonly link: string;

    @IsEmpty() createdAt: string;
    @IsEmpty() updatedAt: string;

    @IsNotEmpty()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'John',
    })
    readonly firstName: string;

    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Jason',
    })
    readonly middleName: string;

    @ApiModelProperty({
        required: false,
        type: String,
        example: 'Doe',
    })
    readonly lastName: string;

    @IsNotEmpty()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'password12345',
    })
    readonly password: string;

    @IsEmail()
    @ApiModelProperty({
        required: true,
        type: String,
        example: 'example@mail.com',
    })
    email: string;

    readonly twets: string[];

    readonly tags: string[];
}
