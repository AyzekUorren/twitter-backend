import { MONGOOSE_UPDATE_OPTIONS } from './../constants';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './interfaces/tag.interface';
import {
  Inject,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor (@Inject('TAG_MODEL') private readonly tagModel: Model<Tag>) {}

  async create (createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(this.updateDate(createTagDto, true));
    return await createdTag.save();
  }

  async findAll (): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  async findById (tagId: string): Promise<Tag> {
    return await this.tagModel.findById(tagId).exec();
  }

  async remove (tagId: string, author: string): Promise<Tag> {
    const tag = await this.tagModel.findById(tagId).exec();
    if (tag.author !== author) {
      Logger.error('Tag->remove: Tag not found');
      throw new BadRequestException('Tag not found');
    }
    return await this.tagModel.findByIdAndRemove(tagId).exec();
  }

  async update (
    tagId: string,
    updateTagDto: UpdateTagDto,
    author: string,
  ): Promise<Tag> {
    const tag = await this.tagModel.findById(tagId).exec();
    if (!tag || tag.author !== author) {
      Logger.error(`Tag->update: tag:${tagId} not found`);
      throw new BadRequestException();
    }

    return await this.tagModel
      .findOneAndUpdate(
        {
          _id: tagId,
        },
        this.updateDate(updateTagDto),
        MONGOOSE_UPDATE_OPTIONS,
      )
      .exec();
  }

  protected updateDate (
    tagDto: CreateTagDto | UpdateTagDto,
    isCreated = false,
  ): CreateTagDto | UpdateTagDto {
    const currentDateString = new Date().toString();

    tagDto.updatedAt = currentDateString;
    if (isCreated && tagDto instanceof CreateTagDto) {
      tagDto.createdAt = currentDateString;
    }

    return tagDto;
  }
}
