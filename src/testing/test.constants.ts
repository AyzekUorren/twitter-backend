import { UserResponse } from '../user/dto/response.user.dto';

export const TEST_USER: UserResponse = {
    link: 'testLink',
    createdAt: Date.now.toString(),
    updatedAt: Date.now.toString(),
    firstName: 'testName',
    middleName: 'testMiddleName',
    lastName: 'testLastName',
    email: 'test@email.com',
    twets: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
    tags: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
};
