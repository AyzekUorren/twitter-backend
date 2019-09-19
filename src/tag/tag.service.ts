import { UtilsService } from '../utils/utils.service';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';
import { TagUpdateDto } from './dto/tag-update.dto';
import { TagDto } from './dto/tag.dto';
import { Tag } from './interfaces/tag.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TagResponseDto } from './dto/tag-response.dto';

@Injectable()
export class TagService {
    constructor(
        @Inject('TAG_MODEL') private readonly tagModel: Model<Tag>,
        @Inject(UtilsService) private readonly utils: UtilsService,
    ) {}

    async create(createTagDto: TagDto): Promise<TagResponseDto> {
        const createdTag = new this.tagModel(
            TagService.updateDate(createTagDto, true),
        );
        return new TagResponseDto(await createdTag.save());
    }

    async findAll(): Promise<TagResponseDto[]> {
        const tagsArray = await this.tagModel.find().exec();

        return tagsArray.map(tag => new TagResponseDto(tag));
    }

    async findById(tagId: string): Promise<TagResponseDto> {
        UtilsService.validateObjectId(tagId);
        return new TagResponseDto(await this.tagModel.findById(tagId).exec());
    }

    async remove(tagId: string, author: string): Promise<TagResponseDto> {
        UtilsService.validateObjectId(tagId);

        const tag = await this.tagModel.findOne({ _id: tagId, author }).exec();
        UtilsService.checkModel(tag, 'Tag not found', 'Tag->remove');
        return new TagResponseDto(
            await this.tagModel.findByIdAndRemove(tagId).exec(),
        );
    }

    async update(
        tagId: string,
        updateTagDto: TagUpdateDto,
        author: string,
    ): Promise<TagResponseDto> {
        UtilsService.validateObjectId(tagId);

        const tag = await this.tagModel.findOne({ _id: tagId, author }).exec();
        UtilsService.checkModel(tag, `tag:${tagId} not found`, 'Tag->update');

        const updatedTag = await this.tagModel
            .findOneAndUpdate(
                {
                    _id: tagId,
                },
                TagService.updateDate(updateTagDto),
                MONGOOSE_UPDATE_OPTIONS,
            )
            .exec();

        return new TagResponseDto(updatedTag);
    }

    protected static updateDate(
        tagDto: TagDto | TagUpdateDto,
        isCreated = false,
    ): TagDto | TagUpdateDto {
        const currentDateString = new Date().toString();

        tagDto.updatedAt = currentDateString;
        if (isCreated) {
            tagDto.createdAt = currentDateString;
        }

        return tagDto;
    }
}
