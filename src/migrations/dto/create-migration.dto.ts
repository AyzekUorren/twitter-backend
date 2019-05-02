import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMigrationDto {
	@ApiModelProperty() readonly count: number;

	@ApiModelProperty() readonly last: string;

	@ApiModelProperty() readonly currentVersion: string;
}
