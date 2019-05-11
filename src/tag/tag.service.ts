import { UtilsService } from '../utils/utils.service';
import { MONGOOSE_UPDATE_OPTIONS } from './../constants';
import { TagUpdateDto } from './dto/tag-update.dto';
import { TagDto } from './dto/tag.dto';
import { Tag } from './interfaces/tag.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
    constructor(
        @Inject('TAG_MODEL') private readonly tagModel: Model<Tag>,
        @Inject(UtilsService) private readonly utils: UtilsService,
    ) {}

    async create(createTagDto: TagDto): Promise<Tag> {
        const createdTag = new this.tagModel(
            this.updateDate(createTagDto, true),
        );
        return await createdTag.save();
    }

    async findAll(): Promise<Tag[]> {
        return await this.tagModel.find().exec();
    }

    async findById(tagId: string): Promise<Tag> {
        this.utils.validateObjecId(tagId);
        return await this.tagModel.findById(tagId).exec();
    }

    async remove(tagId: string, author: string): Promise<Tag> {
        this.utils.validateObjecId(tagId);

        const tag = await this.tagModel
            .findOne({ _id: tagId, author: author })
            .exec();
        this.utils.checkModel(tag, 'Tag not found', 'Tag->remove');
        return await this.tagModel.findByIdAndRemove(tagId).exec();
    }

    async update(
        tagId: string,
        updateTagDto: TagUpdateDto,
        author: string,
    ): Promise<Tag> {
        this.utils.validateObjecId(tagId);

        const tag = await this.tagModel
            .findOne({ _id: tagId, author: author })
            .exec();
        this.utils.checkModel(tag, `tag:${tagId} not found`, 'Tag->update');

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

    protected updateDate(
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
