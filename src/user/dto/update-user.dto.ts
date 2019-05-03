import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiModelProperty({
    required: false,
    type: String,
    example: 'example.com/image.jpg',
  })
  readonly link: string;

  @IsEmpty() updatedAt: string;

  @ApiModelProperty({
    required: false,
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

  @ApiModelProperty({
    required: false,
    type: String,
    example: 'password12345',
  })
  readonly password: string;

  @IsOptional()
  @IsEmail()
  @ApiModelProperty({
    required: false,
    type: String,
    example: 'example@mail.com',
  })
  readonly email: string;
}
