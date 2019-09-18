import { UtilsService } from '../utils/utils.service';
import { TwetUpdateDto } from './dto/twet-update.dto';
import { TwetTagDTO } from './dto/twet-tag.dto';
import { TwetDto } from './dto/twet.dto';
import { Twet } from './interfaces/twet.interface';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';
import { TagService } from '../tag/tag.service';
import { TwetResponseDto } from './dto/twet-response.dto';

@Injectable()
export class TwetService {
    constructor(
        @Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
        @Inject(forwardRef(() => TagService))
        private readonly tagService: TagService,
        @Inject(UtilsService) private readonly utils: UtilsService,
    ) {}

    async create(createTwetDto: TwetDto): Promise<TwetResponseDto> {
        const createdTwet = new this.twetModel(
            TwetService.updateDate(createTwetDto, true),
        );
        await createdTwet.save();
        return new TwetResponseDto(createdTwet);
    }

    async update(
        twetId: string,
        twetDto: TwetUpdateDto,
        author: string,
    ): Promise<TwetResponseDto> {
        UtilsService.validateObjectId(twetId);

        const twet = await this.twetModel
            .findOne({ _id: twetId, author })
            .exec();
        UtilsService.checkModel(
            twet,
            `twet:${twetId} not found`,
            'Twet->update',
        );

        twetDto.updatedAt = new Date().toString();

        const updatedTwet = await this.twetModel
            .findOneAndUpdate(
                {
                    _id: twetId,
                },
                twetDto,
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new TwetResponseDto(updatedTwet);
    }

    async findAll(): Promise<TwetResponseDto[]> {
        const twets = await this.twetModel
            .find()
            .populate('tags')
            .populate('twets')
            .exec();

        return twets.map(twet => new TwetResponseDto(twet));
    }

    async addTag(twetTagDto: TwetTagDTO): Promise<TwetResponseDto> {
        const tag = await this.tagService.findById(twetTagDto.tagId);
        const twet = await this.twetModel.findById(twetTagDto.twetId);
        UtilsService.checkModel(
            tag && twet,
            `(Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
            'Twet->addTag',
        );

        const updatedDateTwet = TwetService.updateDate(twet);

        const updatedTwet = await this.twetModel
            .findOneAndUpdate(
                { _id: twet.id },
                {
                    $set: { updatedAt: updatedDateTwet.updatedAt },
                    $addToSet: { tags: tag.id },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new TwetResponseDto(updatedTwet);
    }

    async remove(twetId: string): Promise<TwetResponseDto> {
        UtilsService.validateObjectId(twetId);

        const twet = await this.twetModel.findByIdAndRemove(twetId).exec();

        return new TwetResponseDto(twet);
    }

    async removeTag(twetTagDto: TwetTagDTO): Promise<TwetResponseDto> {
        const tag = await this.tagService.findById(twetTagDto.tagId);
        const twet = await this.twetModel.findById(twetTagDto.twetId);
        UtilsService.checkModel(
            tag && twet,
            `(Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`,
            'Twet->removeTag',
        );

        const updatedDateTwet = TwetService.updateDate(twet);

        const updatedTwet = await this.twetModel
            .findOneAndUpdate(
                { _id: twet.id },
                {
                    $set: { updatedAt: updatedDateTwet.updatedAt },
                    $pull: { tags: tag.id },
                },
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new TwetResponseDto(updatedTwet);
    }

    protected static updateDate(
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
