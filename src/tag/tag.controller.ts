import { UpdateTagDto } from './dto/update-tag.dto';
import { UserService } from './../user/user.service';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';
import { Controller, Get, Post, Body, Param, Inject, forwardRef, Delete, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('tag')
@ApiUseTags('tag')
export class TagController {
	constructor(private readonly tagService: TagService, private readonly userService: UserService) {}

	@Post()
	async create(@Body() createTagDto: CreateTagDto) {
		const createdTag = await this.tagService.create(createTagDto);
		await this.userService.addTag({
			userId: createdTag.author,
			tagId: createdTag.id
		});
		return createdTag;
	}

	@Get()
	async findAll(): Promise<Tag[]> {
		return await this.tagService.findAll();
	}

	@Get(':id')
	async getById(@Param('id') tagId: string) {
		return await this.tagService.findById(tagId);
	}

	@Put(':id')
	async update(@Param('id') tagId: string, @Body() updateTagDto: UpdateTagDto) {
		return await this.tagService.update(tagId, updateTagDto);
	}

	@Delete(':id')
	async remove(@Param('id') tagId: string) {
		const removedTag = await this.tagService.remove(tagId);
		await this.userService.removeTag({
			userId: removedTag.author,
			tagId: removedTag.id
		});
	}
}
