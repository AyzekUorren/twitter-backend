import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserTagDTO {
  @IsMongoId()
  @ApiModelProperty({
      required: true,
      type: String,
      example: 'MongoId',
  })
  readonly userId: string;

  @IsMongoId()
  @ApiModelProperty({
      required: true,
      type: String,
      example: 'MongoId',
  })
  readonly tagId: string;
}
