import { UserTwetDto } from './dto/userTwet.dto';
import { UserTagDto } from './dto/userTag.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { MONGOOSE_UPDATE_OPTIONS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
    .find()
    .exec();
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel
    .findById(userId)
    .populate('twets tags')
    .exec();
  }

  async addTwet(userTwetDto: UserTwetDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      userTwetDto.userId,
      { $addToSet: {twets: userTwetDto.twetId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }

  async removeTwet(userTwetDto: UserTwetDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      userTwetDto.userId,
      { $pull: {twets: userTwetDto.twetId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }

  async addTag(userTagdto: UserTagDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      userTagdto.userId,
      { $addToSet: {tags: userTagdto.tagId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }

  async removeTag(userTagDto: UserTagDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      userTagDto.userId,
      { $pull: {tags: userTagDto.tagId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }
}
