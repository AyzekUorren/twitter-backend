import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsEmpty } from 'class-validator';

export class CreateTwetDto {
	@IsEmpty() createdAt: string;
	@IsEmpty() updatedAt: string;

	@IsString()
	@ApiModelProperty({
		required: true,
		type: String,
		example: 'Twett Name'
	})
	readonly name: string;

	@IsString()
	@ApiModelProperty({
		required: false,
		type: String,
		default: '',
		example: 'site.com/image.jpg'
	})
	readonly link: string;

	@IsString()
	@ApiModelProperty({
		required: true,
		type: String,
		example: 'Twett comment.'
	})
	readonly content: string;

	readonly tags: string[];

	@IsMongoId()
	@ApiModelProperty({
		required: true,
		type: String,
		example: 'MongoId'
	})
	readonly author: string;
}
