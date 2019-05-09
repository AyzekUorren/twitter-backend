import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { TwetModule } from '../twet/twet.module';
import { TagModule } from '../tag/tag.module';
import { UtilsModule } from '../main/helpers/utils.module';
import { userProviders } from './user.providers';
import { forwardRef } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

describe('UserController', () => {
    let userService: UserService;
    let userController: UserController;

    jest.setTimeout(50000);

    const unathorized = {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'authorization token not found',
    };

    const testUser: UserDto = {
        link: 'testLink',
        createdAt: Date.now.toString(),
        updatedAt: Date.now.toString(),
        firstName: 'testName',
        middleName: 'testMiddleName',
        lastName: 'testLastName',
        password: 'password123456789',
        email: 'test@email.com',
        twets: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
        tags: ['5cd489a2d7b4130017874edf', '5cd489a3d7b4130017874ee0'],
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                forwardRef(() => TwetModule),
                forwardRef(() => TagModule),
                forwardRef(() => UtilsModule),
            ],
            controllers: [UserController],
            providers: [UserService, ...userProviders],
            exports: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    describe('findAll', () => {
        const result = [testUser, testUser];
        jest.spyOn(userService, 'findAll').mockImplementation(
            async () => await result,
        );
        it('should return array of Users', async () => {
            expect(await userController.findAll()).toBe(result);
        });
    });
});
