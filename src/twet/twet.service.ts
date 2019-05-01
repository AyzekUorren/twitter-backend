import { UserTwetDto } from './../user/dto/userTwet.dto';
import { TwetTagDTO } from './dto/twetTag.dto';
import { UserService } from './../user/user.service';
import { CreateTwettDto } from './dto/create-twet.dto';
import { Twet } from './interfaces/twet.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';

@Injectable()
export class TwetService {
  constructor(
    @Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
    private readonly userService: UserService,
  ) {}

  async create(createTwettDto: CreateTwettDto): Promise<Twet> {
    const createdTwet = new this.twetModel(createTwettDto);
    createdTwet.save();
    this.userService.addTwet({
      userId: createTwettDto.author,
      twetId: createdTwet._id,
    });
    return await createdTwet;
  }

  async findAll(): Promise<Twet[]> {
    return await this.twetModel
    .find()
    .populate('tags')
    .populate('twets')
    .exec();
  }

  async addTag(twetTagDto: TwetTagDTO): Promise<Twet> {
    return await this.twetModel.findByIdAndUpdate(
      twetTagDto.twetId,
      { $addToSet: {tags: twetTagDto.tagId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }

  async remove(twetId: string) {
    const twet = await this.twetModel.findByIdAndRemove(twetId).exec();
    await this.userService.removeTwet({userId: twet.author, twetId: twet.id});
  }

  async removeTag(twetTagDto: TwetTagDTO): Promise<Twet> {
    return await this.twetModel.findByIdAndUpdate(
      twetTagDto.twetId,
      { $pull: {tags: twetTagDto.tagId}},
      MONGOOSE_UPDATE_OPTIONS,
    ).exec();
  }
}
