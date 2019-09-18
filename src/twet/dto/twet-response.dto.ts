import { AbstractResponseDto } from '../../utils/dto/abstract-response.dto';

export class TwetResponseDto extends AbstractResponseDto {
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name: string;
    readonly link: string;
    readonly content: string;
    readonly tags: string[];
    readonly author: string;
    readonly id: string;

    constructor(data: any) {
        super();
        AbstractResponseDto.SetValueIfExists(this, data, 'createdAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'updatedAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'name');
        AbstractResponseDto.SetValueIfExists(this, data, 'link');
        AbstractResponseDto.SetValueIfExists(this, data, 'content');
        AbstractResponseDto.SetValueIfExists(this, data, 'tags');
        AbstractResponseDto.SetValueIfExists(this, data, 'author');
        AbstractResponseDto.SetValueIfExists(this, data, 'id');
    }
}
