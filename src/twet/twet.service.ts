import { UpdateTwetDto } from './dto/update-twet.dto';
import { TwetTagDTO } from '../main/dto/twet-tag.dto';
import { TwetDto } from './dto/create-twet.dto';
import { Twet } from './interfaces/twet.interface';
import {
  Inject,
  Injectable,
  forwardRef,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Model, mongo } from 'mongoose';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TwetService {
  constructor (
    @Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,
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
    if (!mongo.ObjectID.isValid(twetId)) {
      Logger.error(`ObjectID is not valid ${twetId}`);
      throw new BadRequestException(`ObjectID is not valid ${twetId}`);
    }

    const twet = await this.twetModel.findById(twetId).exec();
    if (!twet || twet.author.toString() !== author.toString()) {
      Logger.error(`Twet->update: twet:${twetId} not found`);
      throw new BadRequestException();
    }

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
    if (tag === null || twet === null) {
      Logger.error(
        `Twet->addTag: (Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
      );
      throw new BadRequestException('Wrong params');
    }

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
    if (!mongo.ObjectID.isValid(twetId)) {
      Logger.error(`ObjectID is not valid ${twetId}`);
      throw new BadRequestException(`ObjectID is not valid ${twetId}`);
    }

    return await this.twetModel.findByIdAndRemove(twetId).exec();
  }

  async removeTag (twetTagDto: TwetTagDTO): Promise<Twet> {
    const tag = await this.tagService.findById(twetTagDto.tagId);
    const twet = await this.twetModel.findById(twetTagDto.twetId);
    if (!tag || !twet) {
      Logger.error(
        `Twet->addTag: tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
      );
      throw new BadRequestException('Wrong params');
    }

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
    if (isCreated && createTwetDto instanceof TwetDto) {
      createTwetDto.createdAt = currentDateString;
    }

    return createTwetDto;
  }
}
