import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserIdDto {
  @IsMongoId()
  @ApiModelProperty({
    required: true,
    type: String,
    example: 'MongoId',
  })
  readonly userId: string;
}
