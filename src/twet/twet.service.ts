import { UserService } from './../user/user.service';
import { CreateTwettDto } from './dto/create-twet.dto';
import { Twet } from './interfaces/twet.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TwetService {
  constructor(
    @Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
    private readonly userService: UserService,
  ) {}

  async create(createTwettDto: CreateTwettDto): Promise<Twet> {
    const createdTwet = new this.twetModel(createTwettDto);
    createdTwet.save();
    this.userService.addTwet(createTwettDto.author, createdTwet._id);
    return await createdTwet;
  }

  async findAll(): Promise<Twet[]> {
    return await this.twetModel
    .find()
    .populate('author')
    .populate('tags')
    .exec();
  }

  async addTag(twetId: string, tagId: string): Promise<Twet> {
    const currentTweet = await this.twetModel.findById(twetId).exec();

    currentTweet.tags.push(tagId);
    return await currentTweet.save();
  }

  async removeTag(twetId: string, tagId: string): Promise<Twet> {
    const currentTweet = await this.twetModel.findById(twetId).exec();

    currentTweet.tags.filter((element) => element !== tagId);
    return await currentTweet.save();
  }
}
