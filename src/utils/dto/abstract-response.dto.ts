export class AbstractResponseDto {
    protected static SetValueIfExists(
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
