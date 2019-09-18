export class UserResponseDto {
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
        UserResponseDto.SetValueIfExists(this, data, 'link');
        UserResponseDto.SetValueIfExists(this, data, 'createdAt');
        UserResponseDto.SetValueIfExists(this, data, 'updatedAt');
        UserResponseDto.SetValueIfExists(this, data, 'firstName');
        UserResponseDto.SetValueIfExists(this, data, 'middleName');
        UserResponseDto.SetValueIfExists(this, data, 'lastName');
        UserResponseDto.SetValueIfExists(this, data, 'email');
        UserResponseDto.SetValueIfExists(this, data, 'twets');
        UserResponseDto.SetValueIfExists(this, data, 'tags');
    }

    private static SetValueIfExists(
        responseObject: any,
        data: any,
        valueName: string,
    ) {
        if (
            (Array.isArray(data[valueName]) && data[valueName].length > 0) ||
            (!Array.isArray(data[valueName]) && !!data[valueName])
        ) {
            return (responseObject[valueName] = data[valueName]);
        }

        return responseObject;
    }
}
