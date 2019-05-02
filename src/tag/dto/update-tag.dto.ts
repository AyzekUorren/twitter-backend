import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsEmpty } from 'class-validator';

export class UpdateTagDto {
	@IsEmpty() updatedAt: string;

	@IsString()
	@ApiModelProperty({
		required: true,
		type: String,
		example: 'Tag Name'
	})
	readonly name: string;

	@IsString()
	@ApiModelProperty({
		required: true,
		type: String,
		example: 'This tag is used as an example.'
	})
	readonly description: string;
}
