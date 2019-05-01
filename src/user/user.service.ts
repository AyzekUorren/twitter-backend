import { TagService } from './../tag/tag.service';
import { TwetService } from './../twet/twet.service';
import { UserTwetDto } from './dto/userTwet.dto';
import { UserTagDto } from './dto/userTag.dto';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { MONGOOSE_UPDATE_OPTIONS } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
    private readonly twetService: TwetService,
    private readonly tagService: TagService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async remove(userId: string) {
    const user = await this.userModel.findByIdAndRemove(userId).exec();
    if (!user || !user.twets) {
      throw new BadRequestException();
    }

    for await (const twetId of user.twets) {
      this.twetService.remove(twetId);
    }

    for await (const tagId of user.tags) {
      this.tagService.remove(tagId);
    }
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
