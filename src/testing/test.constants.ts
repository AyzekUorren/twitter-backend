import { UserResponseDto } from '../user/dto/user-response.dto';
import { UserDto } from '../user/dto/user.dto';
import { TwetResponseDto } from '../twet/dto/twet-response.dto';

export const TEST_USER_RESPONSE: UserResponseDto = {
    link: 'testLink',
    createdAt: 'Sat May 11 2019',
    updatedAt: 'Sat May 11 2019',
    firstName: 'testName',
    middleName: 'testMiddleName',
    lastName: 'testLastName',
    email: 'test@email.com',
    twets: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
    tags: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
};

export const TEST_USER: UserDto = {
    link: 'testLink',
    createdAt: 'Sat May 11 2019',
    updatedAt: 'Sat May 11 2019',
    firstName: 'testfirstName',
    middleName: 'testmiddleName',
    lastName: 'testlastName',
    password: '12345qQ',
    email: 'test@email.com',
    twets: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
    tags: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
};

export const TEST_TWET: TwetResponseDto = {
    createdAt: 'Sat May 12 2019',
    updatedAt: 'Sat May 12 2019',
    name: 'Test twet name',
    link: 'testlink.com/img.jpg',
    content: 'test Comment',
    tags: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
    author: TEST_USER_RESPONSE.email,
    id: 'testedTwetId1111',
};
