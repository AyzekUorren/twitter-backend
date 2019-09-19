import { TEST_USER_RESPONSE, TEST_USER } from '../testing/test.constants';
import { UserResponseDto } from './dto/user-response.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { forwardRef, BadRequestException } from '@nestjs/common';
import { TwetModule } from '../twet/twet.module';
import { TagModule } from '../tag/tag.module';
import { UtilsModule } from '../utils/utils.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

describe('UserController', () => {
    jest.setTimeout(50000);
    let userController: UserController;
    let userService: UserService;
    const fakeUserId: string = '5cd489a2d7b4130017874edf';
    let spy;
    const resultArray: UserResponseDto[] = [
        TEST_USER_RESPONSE,
        TEST_USER_RESPONSE,
    ];
    const resultArrayEmpty: UserResponseDto[] = [];
    const resultEmpty: UserResponseDto = new UserResponseDto({});
    const result: UserResponseDto = TEST_USER_RESPONSE;
    const resultUserDTO = TEST_USER;

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

    describe('findAll', () => {
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
                .mockImplementationOnce(() =>
                    Promise.resolve(resultArrayEmpty),
                );

            expect(await userController.findAll()).toBe(resultArrayEmpty);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith();
        });
    });

    describe('findById', () => {
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

    describe('create', () => {
        it('should throw BadRequestException', async () => {
            spy = jest
                .spyOn(userService, 'create')
                .mockImplementationOnce(resultUserDTO => {
                    throw new BadRequestException();
                });

            await expect(userController.create(resultUserDTO)).rejects.toThrow(
                BadRequestException,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(resultUserDTO);
        });

        it('should return empty', async () => {
            spy = jest
                .spyOn(userService, 'create')
                .mockImplementationOnce(
                    async resultUserDTO => await resultEmpty,
                );

            expect(await userController.create(resultUserDTO)).toBe(
                resultEmpty,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(resultUserDTO);
        });

        it('should return User', async () => {
            spy = jest
                .spyOn(userService, 'create')
                .mockImplementationOnce(async resultUserDTO => await result);

            expect(await userController.create(resultUserDTO)).toBe(result);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(resultUserDTO);
        });
    });

    describe('update', () => {
        it('should throw BadRequestException', async () => {
            spy = jest
                .spyOn(userService, 'update')
                .mockImplementationOnce((fakeUserId, resultUserDTO) => {
                    throw new BadRequestException();
                });

            await expect(
                userController.update(fakeUserId, resultUserDTO),
            ).rejects.toThrow(BadRequestException);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId, resultUserDTO);
        });

        it('should return empty', async () => {
            spy = jest
                .spyOn(userService, 'update')
                .mockImplementationOnce(
                    async (fakeUserId, resultUserDTO) => await resultEmpty,
                );

            expect(await userController.update(fakeUserId, resultUserDTO)).toBe(
                resultEmpty,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId, resultUserDTO);
        });

        it('should return User', async () => {
            spy = jest
                .spyOn(userService, 'update')
                .mockImplementationOnce(
                    async (fakeUserId, resultUserDTO) => await result,
                );

            expect(await userController.update(fakeUserId, resultUserDTO)).toBe(
                result,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId, resultUserDTO);
        });
    });

    describe('remove', () => {
        it('should throw BadRequestException', async () => {
            spy = jest
                .spyOn(userService, 'remove')
                .mockImplementationOnce(fakeUserId => {
                    throw new BadRequestException();
                });

            await expect(userController.remove(fakeUserId)).rejects.toThrow(
                BadRequestException,
            );
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId);
        });

        it('should return status: ok', async () => {
            spy = jest
                .spyOn(userService, 'remove')
                .mockImplementationOnce(async fakeUserId => await null);

            expect(await userController.remove(fakeUserId)).toEqual({
                status: 'ok',
                message: 'User and all related objects are deleted.',
            });
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(fakeUserId);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
