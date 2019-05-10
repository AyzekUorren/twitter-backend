export class UserResponse {
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
        this.link = data.link ? data.link : 'not defined';
        if (!!data.createdAt) {
            this.createdAt = data.createdAt;
        }
        if (!!data.updatedAt) {
            this.updatedAt = data.updatedAt;
        }
        if (!!data.firstName) {
            this.firstName = data.firstName;
        }
        this.middleName = data.middleName ? data.middleName : '';
        this.lastName = data.lastName ? data.lastName : '';
        if (!!data.email) {
            this.email = data.email;
        }
        this.twets = data.twets ? data.twets : [];
        this.tags = data.tags ? data.tags : [];
    }
}
