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
        this.link = data.link || 'not defined';
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.firstName = data.firstName;
        this.middleName = data.middleName || '';
        this.lastName = data.lastName || '';
        this.email = data.email;
        this.twets = data.twets || [];
        this.tags = data.tags || [];
    }
}
