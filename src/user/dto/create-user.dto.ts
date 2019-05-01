import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty({
    required: true,
    type: String,
    example: 'example.com/image.jpg',
  })
  readonly link: string;

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
  readonly email: string;

  readonly twets: string[];
}
