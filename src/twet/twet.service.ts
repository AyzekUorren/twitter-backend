import { UtilsService } from '../main/helpers/utils.service';
import { UpdateTwetDto } from './dto/update-twet.dto';
import { TwetTagDTO } from '../main/dto/twet-tag.dto';
import { TwetDto } from './dto/create-twet.dto';
import { Twet } from './interfaces/twet.interface';
import { Inject, Injectable, forwardRef, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TwetService {
  constructor (
    @Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,
    @Inject(UtilsService) private readonly utils: UtilsService,
  ) {}

  async create (createTwetDto: TwetDto): Promise<Twet> {
    const createdTwet = new this.twetModel(
      this.updateDate(createTwetDto, true),
    );
    await createdTwet.save();
    return createdTwet;
  }

  async update (
    twetId: string,
    twetDto: UpdateTwetDto,
    author: string,
  ): Promise<Twet> {
    this.utils.validateObjecId(twetId);

    const twet = await this.twetModel
      .findOne({ _id: twetId, author: author })
      .exec();
    this.utils.checkModel(twet, `twet:${twetId} not found`, 'Twet->update');

    twetDto.updatedAt = new Date().toString();
    return await this.twetModel
      .findOneAndUpdate(
        {
          _id: twetId,
        },
        twetDto,
        MONGOOSE_UPDATE_OPTIONS,
      )
      .exec();
  }

  async findAll (): Promise<Twet[]> {
    return await this.twetModel
      .find()
      .populate('tags')
      .populate('twets')
      .exec();
  }

  async addTag (twetTagDto: TwetTagDTO): Promise<Twet> {
    const tag = await this.tagService.findById(twetTagDto.tagId);
    const twet = await this.twetModel.findById(twetTagDto.twetId);
    this.utils.checkModel(
      tag && twet,
      `(Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
      'Twet->addTag',
    );

    const updatedTwet = this.updateDate(twet);

    return await this.twetModel
      .findOneAndUpdate(
        { _id: twet.id },
        {
          $set: { updatedAt: updatedTwet.updatedAt },
          $addToSet: { tags: tag.id },
        },
        MONGOOSE_UPDATE_OPTIONS,
      )
      .exec();
  }

  async remove (twetId: string): Promise<Twet> {
    this.utils.validateObjecId(twetId);

    return await this.twetModel.findByIdAndRemove(twetId).exec();
  }

  async removeTag (twetTagDto: TwetTagDTO): Promise<Twet> {
    const tag = await this.tagService.findById(twetTagDto.tagId);
    const twet = await this.twetModel.findById(twetTagDto.twetId);
    this.utils.checkModel(
      tag && twet,
      `(Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
      'Twet->removeTag',
    );

    const updatedTwet = this.updateDate(twet);

    return await this.twetModel
      .findOneAndUpdate(
        { _id: twet.id },
        {
          $set: { updatedAt: updatedTwet.updatedAt },
          $pull: { tags: tag.id },
        },
        MONGOOSE_UPDATE_OPTIONS,
      )
      .exec();
  }

  protected updateDate (
    createTwetDto: TwetDto | Twet,
    isCreated = false,
  ): TwetDto | Twet {
    const currentDateString = new Date().toString();

    createTwetDto.updatedAt = currentDateString;
    if (isCreated) {
      createTwetDto.createdAt = currentDateString;
    }

    return createTwetDto;
  }
}
