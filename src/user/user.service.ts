import { UserResponseDto } from './dto/user-response.dto';
import { UtilsService } from '../utils/utils.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { TagService } from '../tag/tag.service';
import { TwetService } from '../twet/twet.service';
import { UserTwetDto } from './dto/user-twet.dto';
import { UserTagDto } from './dto/user-tag.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL') private readonly userModel: Model<User>,
        private readonly twetService: TwetService,
        private readonly tagService: TagService,
        @Inject(UtilsService) private readonly utils: UtilsService,
    ) {}

    async create(createUserDto: UserDto): Promise<UserResponseDto> {
        const user = await this.userModel
            .findOne({ email: createUserDto.email })
            .exec();
        UtilsService.checkModel(
            !user,
            'User already exists',
            'userService->create',
        );

        createUserDto.email = createUserDto.email.toLowerCase();
        const createdUser = new this.userModel(
            UserService.updateDate(createUserDto, true),
        );

        const newUser = await createdUser.save();

        return new UserResponseDto(newUser);
    }

    async update(
        userId: string,
        userDto: UserUpdateDto,
    ): Promise<UserResponseDto> {
        UtilsService.validateObjectId(userId);

        const user = await this.userModel.findById(userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userId} not found`,
            'User->remove',
        );

        userDto.updatedAt = new Date().toString();

        const newUser = await this.userModel
            .findOneAndUpdate(
                {
                    _id: userId,
                },
                userDto,
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new UserResponseDto(newUser);
    }

    async remove(userId: string) {
        UtilsService.validateObjectId(userId);

        const user = await this.userModel.findByIdAndRemove(userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userId} not found`,
            'User->remove',
        );

        if (user.twets) {
            for await (const twetId of user.twets) {
                this.twetService.remove(twetId);
            }
        }

        if (user.tags) {
            for await (const tagId of user.tags) {
                this.tagService.remove(tagId, user.id);
            }
        }
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userModel.find().exec();

        return users.map(user => new UserResponseDto(user));
    }

    async findById(userId: string): Promise<UserResponseDto | {}> {
        UtilsService.validateObjectId(userId);

        const user = await this.userModel
            .findById(userId)
            .populate('twets tags')
            .exec();

        return user ? new UserResponseDto(user) : {};
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({ email: userEmail }).exec();
    }

    async addTwet(userTwetDto: UserTwetDto): Promise<UserResponseDto> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->addTwet',
        );

        const userDate = UserService.updateDate(user);
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userTwetDto.userId,
                {
                    $set: { updatedAt: userDate.updatedAt },
                    $addToSet: { twets: userTwetDto.twetId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new UserResponseDto(updatedUser);
    }

    async removeTwet(userTwetDto: UserTwetDto): Promise<UserResponseDto> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->removeTwet',
        );

        const userDate = UserService.updateDate(user);
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userTwetDto.userId,
                {
                    $set: { updatedAt: userDate.updatedAt },
                    $pull: { twets: userTwetDto.twetId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new UserResponseDto(updatedUser);
    }

    async addTag(userTagdto: UserTagDto): Promise<UserResponseDto> {
        const user = await this.userModel.findById(userTagdto.userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userTagdto.userId} not found`,
            'User->addTag',
        );

        const userDate = UserService.updateDate(user);
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userTagdto.userId,
                {
                    $set: { updatedAt: userDate.updatedAt },
                    $addToSet: { tags: userTagdto.tagId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new UserResponseDto(updatedUser);
    }

    async removeTag(userTagDto: UserTagDto): Promise<UserResponseDto> {
        const user = await this.userModel.findById(userTagDto.userId).exec();
        UtilsService.checkModel(
            user,
            `user:${userTagDto.userId} not found`,
            'User->removeTag',
        );

        const userDate = UserService.updateDate(user);
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userTagDto.userId,
                {
                    $set: { updatedAt: userDate.updatedAt },
                    $pull: { tags: userTagDto.tagId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new UserResponseDto(updatedUser);
    }

    protected static updateDate(
        userDto: UserDto | User,
        isCreated = false,
    ): UserDto | User {
        const currentDateString = new Date().toString();

        userDto.updatedAt = currentDateString;
        if (isCreated) {
            userDto.createdAt = currentDateString;
        }

        return userDto;
    }
}
