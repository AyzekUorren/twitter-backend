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
        if (!!data.link) {
            this.link = data.link;
        }
        if (!!data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (!!data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
        if (!!data.firstName) {
            this.firstName = data.firstName;
        }
        if (!!data.middleName) {
            this.middleName = data.middleName;
        }
        if (!!data.lastName) {
            this.lastName = data.lastName;
        }
        if (!!data.email) {
            this.email = data.email;
        }
        if (!!data.twets) {
            this.twets = data.twets;
        }
        if (!!data.tags) {
            this.tags = data.tags;
        }
    }
}
