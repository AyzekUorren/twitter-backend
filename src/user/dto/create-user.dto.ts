import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly age: number;

  @ApiModelProperty()
  readonly breed: string;
}
