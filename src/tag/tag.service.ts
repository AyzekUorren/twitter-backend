import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './interfaces/tag.interface';
import { UserService } from '../user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_MODEL') private readonly tagModel: Model<Tag>,
    private readonly userService: UserService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    createdTag.save();
    this.userService.addTag(createTagDto.author, createdTag._id);
    return await createdTag;
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel
    .find()
    .populate('author')
    .exec();
  }
}
