import { UserResponse } from './dto/response.user.dto';
import { UtilsService } from '../main/helpers/utils.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagService } from '../modules/tag/tag.service';
import { TwetService } from '../modules/twet/twet.service';
import { UserTwetDTO } from '../main/dto/user-twet.dto';
import { UserTagDTO } from '../main/dto/user-tag.dto';
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

    async create(createUserDto: UserDto): Promise<UserResponse> {
        const user = await this.userModel
            .findOne({ email: createUserDto.email })
            .exec();
        this.utils.checkModel(
            !user,
            'User already exists',
            'userService->create',
        );

        createUserDto.email = createUserDto.email.toLowerCase();
        const createdUser = new this.userModel(
            this.updateDate(createUserDto, true),
        );

        const newUser = await createdUser.save();

        return new UserResponse(newUser);
    }

    async update(
        userId: string,
        userDto: UpdateUserDto,
    ): Promise<UserResponse> {
        this.utils.validateObjecId(userId);

        const user = await this.userModel.findById(userId).exec();
        this.utils.checkModel(user, `user:${userId} not found`, 'User->remove');

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

        return new UserResponse(newUser);
    }

    async remove(userId: string) {
        this.utils.validateObjecId(userId);

        const user = await this.userModel.findByIdAndRemove(userId).exec();
        this.utils.checkModel(user, `user:${userId} not found`, 'User->remove');

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

    async findAll(): Promise<UserResponse[]> {
        const users = await this.userModel.find().exec();

        const responseUsers: UserResponse[] = users.map(
            user => new UserResponse(user),
        );
        return responseUsers;
    }

    async findById(userId: string): Promise<UserResponse | {}> {
        this.utils.validateObjecId(userId);

        const user = await this.userModel
            .findById(userId)
            .populate('twets tags')
            .exec();

        return user ? new UserResponse(user) : {};
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({ email: userEmail }).exec();
    }

    async addTwet(userTwetDto: UserTwetDTO): Promise<UserResponse> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->addTwet',
        );

        const userDate = this.updateDate(user);
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

        return new UserResponse(updatedUser);
    }

    async removeTwet(userTwetDto: UserTwetDTO): Promise<UserResponse> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->removeTwet',
        );

        const userDate = this.updateDate(user);
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

        return new UserResponse(updatedUser);
    }

    async addTag(userTagdto: UserTagDTO): Promise<UserResponse> {
        const user = await this.userModel.findById(userTagdto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTagdto.userId} not found`,
            'User->addTag',
        );

        const userDate = this.updateDate(user);
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

        return new UserResponse(updatedUser);
    }

    async removeTag(userTagDto: UserTagDTO): Promise<UserResponse> {
        const user = await this.userModel.findById(userTagDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTagDto.userId} not found`,
            'User->removeTag',
        );

        const userDate = this.updateDate(user);
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

        return new UserResponse(updatedUser);
    }

    protected updateDate(
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
