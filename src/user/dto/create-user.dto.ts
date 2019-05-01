import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly link: string;

  @ApiModelProperty()
  readonly createdAt: string;

  @ApiModelProperty()
  readonly updatedAt: string;

  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly middleName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly twets: string[];
}
