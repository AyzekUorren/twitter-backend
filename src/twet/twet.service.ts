import { TwetTagDTO } from '../main/dto/twet-tag.dto';
import { CreateTwetDto } from './dto/create-twet.dto';
import { Twet } from './interfaces/twet.interface';
import { Inject, Injectable, forwardRef, Logger, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MONGOOSE_UPDATE_OPTIONS } from '../constants';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TwetService {
	constructor(
		@Inject('TWET_MODEL') private readonly twetModel: Model<Twet>,
		@Inject(forwardRef(() => TagService))
		private readonly tagService: TagService
	) {}

	async create(createTwetDto: CreateTwetDto): Promise<Twet> {
		const createdTwet = new this.twetModel(this.updateDate(createTwetDto, true));
		await createdTwet.save();
		return createdTwet;
	}

	async findAll(): Promise<Twet[]> {
		return await this.twetModel.find().populate('tags').populate('twets').exec();
	}

	async addTag(twetTagDto: TwetTagDTO): Promise<Twet> {
		const tag = await this.tagService.findById(twetTagDto.tagId);
		const twet = await this.twetModel.findById(twetTagDto.twetId);
		if (tag === null || twet === null) {
			Logger.error(`Twet->addTag: (Wrong params) tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`);
			throw new BadRequestException('Wrong params');
		}

		const updatedTwet = this.updateDate(twet);

		return await this.twetModel
			.findOneAndUpdate(
				{ _id: twet.id },
				{
					$set: { updatedAt: updatedTwet.updatedAt },
					$addToSet: { tags: tag.id }
				},
				MONGOOSE_UPDATE_OPTIONS
			)
			.exec();
	}

	async remove(twetId: string): Promise<Twet> {
		return await this.twetModel.findByIdAndRemove(twetId).exec();
	}

	async removeTag(twetTagDto: TwetTagDTO): Promise<Twet> {
		const tag = await this.tagService.findById(twetTagDto.tagId);
		const twet = await this.twetModel.findById(twetTagDto.twetId);
		if (!tag || !twet) {
			Logger.error(`Twet->addTag: tag:${twetTagDto.tagId} twet:${twetTagDto.twetId}`);
			throw new BadRequestException('Wrong params');
		}

		const updatedTwet = this.updateDate(twet);

		return await this.twetModel
			.findOneAndUpdate(
				{ _id: twet.id },
				{
					$set: { updatedAt: updatedTwet.updatedAt },
					$pull: { tags: tag.id }
				},
				MONGOOSE_UPDATE_OPTIONS
			)
			.exec();
	}

	protected updateDate(createTwetDto: CreateTwetDto | Twet, isCreated = false): CreateTwetDto | Twet {
		const currentDateString = new Date().toString();

		createTwetDto.updatedAt = currentDateString;
		if (isCreated && createTwetDto instanceof CreateTwetDto) {
			createTwetDto.createdAt = currentDateString;
		}

		return createTwetDto;
	}
}
