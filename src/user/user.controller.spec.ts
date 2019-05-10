import { TEST_USER } from '../testing/test.constants';
import { UserResponse } from './dto/response.user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { forwardRef, BadRequestException } from '@nestjs/common';
import { TwetModule } from '../twet/twet.module';
import { TagModule } from '../tag/tag.module';
import { UtilsModule } from '../main/helpers/utils.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

describe('UserController', () => {
    jest.setTimeout(50000);
    let userController: UserController;
    let userService: UserService;
    const fakeUserId: string = '5cd489a2d7b4130017874edf';
    let spy;
    const resultArray: UserResponse[] = [TEST_USER, TEST_USER];
    const resultEmpty: UserResponse[] = [];
    const result: UserResponse = TEST_USER;

    beforeAll(async () => {
        const userModule: TestingModule = await Test.createTestingModule({
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

        userController = userModule.get<UserController>(UserController);
        userService = userModule.get<UserService>(UserService);

        spy = jest.fn();
    });

    describe('UserController -> findAll', () => {
        it('should return array of Users"', async () => {
            spy = jest
                .spyOn(userService, 'findAll')
                .mockImplementationOnce(() => Promise.resolve(resultArray));

            expect(await userController.findAll()).toBe(resultArray);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith();
        });

        it('should return empty"', async () => {
            spy = jest
                .spyOn(userService, 'findAll')
                .mockImplementationOnce(() => Promise.resolve(resultEmpty));

            expect(await userController.findAll()).toBe(resultEmpty);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith();
        });
    });

    describe('UserController -> findById', () => {
        it('should throw BadRequestException"', async () => {
            spy = jest.spyOn(userService, 'findById');

            expect(userService.findById('111')).rejects.toThrow(
                BadRequestException,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('111');
        });

        it('should return empty"', async () => {
            spy = jest
                .spyOn(userService, 'findById')
                .mockImplementationOnce(async fakeUserId => await {});

            expect(await userController.findById(fakeUserId)).toEqual({});
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId);
        });

        it('should return User"', async () => {
            spy = jest
                .spyOn(userService, 'findById')
                .mockImplementationOnce(async fakeUserId => await result);

            expect(await userController.findById(fakeUserId)).toBe(result);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId);
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
