import { AbstractResponseDto } from '../../utils/dto/abstract-response.dto';

export class UserResponseDto extends AbstractResponseDto {
    readonly link: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly firstName: string;
    readonly middleName: string;
    readonly lastName: string;
    readonly email: string;
    readonly twets: string[];
    readonly tags: string[];

    constructor(data: any) {
        super();
        AbstractResponseDto.SetValueIfExists(this, data, 'link');
        AbstractResponseDto.SetValueIfExists(this, data, 'createdAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'updatedAt');
        AbstractResponseDto.SetValueIfExists(this, data, 'firstName');
        AbstractResponseDto.SetValueIfExists(this, data, 'middleName');
        AbstractResponseDto.SetValueIfExists(this, data, 'lastName');
        AbstractResponseDto.SetValueIfExists(this, data, 'email');
        AbstractResponseDto.SetValueIfExists(this, data, 'twets');
        AbstractResponseDto.SetValueIfExists(this, data, 'tags');
    }
}
