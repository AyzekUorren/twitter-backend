import { UpdateUserDto } from './dto/update-user.dto';
import { TagService } from './../tag/tag.service';
import { TwetService } from './../twet/twet.service';
import { UserTwetDTO } from '../main/dto/user-twet.dto';
import { UserTagDTO } from '../main/dto/user-tag.dto';
import {
  Inject,
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Model, mongo } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';

@Injectable()
export class UserService {
  constructor (
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    private readonly twetService: TwetService,
    private readonly tagService: TagService,
  ) {}

  async create (createUserDto: UserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (user) {
      Logger.error('userService->create: User already exists');
      throw new BadRequestException('User already exists');
    }

    createUserDto.email = createUserDto.email.toLowerCase();
    const createdUser = new this.userModel(
      this.updateDate(createUserDto, true),
    );

    return await createdUser.save();
  }

  async update (userId: string, userDto: UpdateUserDto): Promise<User> {
    if (!mongo.ObjectID.isValid(userId)) {
      Logger.error(`ObjectID is not valid ${userId}`);
      throw new BadRequestException(`ObjectID is not valid ${userId}`);
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userId} not found`);
      throw new BadRequestException();
    }

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

  async remove (userId: string) {
    if (!mongo.ObjectID.isValid(userId)) {
      Logger.error(`ObjectID is not valid ${userId}`);
      throw new BadRequestException(`ObjectID is not valid ${userId}`);
    }

    const user = await this.userModel.findByIdAndRemove(userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userId} not found`);
      throw new BadRequestException();
    }

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

  async findAll (): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById (userId: string): Promise<User> {
    if (!mongo.ObjectID.isValid(userId)) {
      Logger.error(`ObjectID is not valid ${userId}`);
      throw new BadRequestException(`ObjectID is not valid ${userId}`);
    }

    return await this.userModel.findById(userId).populate('twets tags').exec();
  }

  async findByEmail (userEmail: string): Promise<User> {
    Logger.debug('findByEmail', userEmail);
    return await this.userModel.findOne({ email: userEmail }).exec();
  }

  async addTwet (userTwetDto: UserTwetDTO): Promise<User> {
    const user = await this.userModel.findById(userTwetDto.userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userTwetDto.userId} not found`);
      throw new BadRequestException();
    }

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

  async removeTwet (userTwetDto: UserTwetDTO): Promise<User> {
    const user = await this.userModel.findById(userTwetDto.userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userTwetDto.userId} not found`);
      throw new BadRequestException();
    }

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

  async addTag (userTagdto: UserTagDTO): Promise<User> {
    const user = await this.userModel.findById(userTagdto.userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userTagdto.userId} not found`);
      throw new BadRequestException();
    }

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

  async removeTag (userTagDto: UserTagDTO): Promise<User> {
    const user = await this.userModel.findById(userTagDto.userId).exec();
    if (!user) {
      Logger.error(`User->remove: user:${userTagDto.userId} not found`);
      throw new BadRequestException();
    }

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

  protected updateDate (
    userDto: UserDto | User,
    isCreated = false,
  ): UserDto | User {
    const currentDateString = new Date().toString();

    userDto.updatedAt = currentDateString;
    if (isCreated && userDto instanceof UserDto) {
      userDto.createdAt = currentDateString;
    }

    return userDto;
  }
}
