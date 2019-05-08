import { UtilsService } from '../main/helpers/utils.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TagService } from './../tag/tag.service';
import { TwetService } from './../twet/twet.service';
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

    async create(createUserDto: UserDto): Promise<User> {
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

        return await createdUser.save();
    }

    async update(userId: string, userDto: UpdateUserDto): Promise<User> {
        this.utils.validateObjecId(userId);

        const user = await this.userModel.findById(userId).exec();
        this.utils.checkModel(user, `user:${userId} not found`, 'User->remove');

        userDto.updatedAt = new Date().toString();
        return await this.userModel
            .findOneAndUpdate(
                {
                    _id: userId,
                },
                userDto,
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();
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

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findById(userId: string): Promise<User> {
        this.utils.validateObjecId(userId);

        return await this.userModel
            .findById(userId)
            .populate('twets tags')
            .exec();
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({ email: userEmail }).exec();
    }

    async addTwet(userTwetDto: UserTwetDTO): Promise<User> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->addTwet',
        );

        const updatedUser = this.updateDate(user);
        return await this.userModel
            .findByIdAndUpdate(
                userTwetDto.userId,
                {
                    $set: { updatedAt: updatedUser.updatedAt },
                    $addToSet: { twets: userTwetDto.twetId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();
    }

    async removeTwet(userTwetDto: UserTwetDTO): Promise<User> {
        const user = await this.userModel.findById(userTwetDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTwetDto.userId} not found`,
            'User->removeTwet',
        );

        const updatedUser = this.updateDate(user);
        return await this.userModel
            .findByIdAndUpdate(
                userTwetDto.userId,
                {
                    $set: { updatedAt: updatedUser.updatedAt },
                    $pull: { twets: userTwetDto.twetId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();
    }

    async addTag(userTagdto: UserTagDTO): Promise<User> {
        const user = await this.userModel.findById(userTagdto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTagdto.userId} not found`,
            'User->addTag',
        );

        const updatedUser = this.updateDate(user);
        return await this.userModel
            .findByIdAndUpdate(
                userTagdto.userId,
                {
                    $set: { updatedAt: updatedUser.updatedAt },
                    $addToSet: { tags: userTagdto.tagId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();
    }

    async removeTag(userTagDto: UserTagDTO): Promise<User> {
        const user = await this.userModel.findById(userTagDto.userId).exec();
        this.utils.checkModel(
            user,
            `user:${userTagDto.userId} not found`,
            'User->removeTag',
        );

        const updatedUser = this.updateDate(user);
        return await this.userModel
            .findByIdAndUpdate(
                userTagDto.userId,
                {
                    $set: { updatedAt: updatedUser.updatedAt },
                    $pull: { tags: userTagDto.tagId },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();
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
