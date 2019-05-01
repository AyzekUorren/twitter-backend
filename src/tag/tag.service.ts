import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './interfaces/tag.interface';
import { UserService } from '../user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_MODEL') private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return await createdTag.save();
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel
    .find()
    .exec();
  }

  async findById(tagId: string): Promise<Tag> {
    return await this.tagModel.findById(tagId).exec();
  }

  async remove(tagId: string): Promise<Tag> {
    return await this.tagModel.findByIdAndRemove(tagId).exec();
  }
}
