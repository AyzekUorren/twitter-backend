import { UpdateTagDto } from './dto/update-tag.dto';
import { UserService } from './../user/user.service';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';
import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@Controller('tag')
@ApiUseTags('tag')
export class TagController {
	constructor(private readonly tagService: TagService, private readonly userService: UserService) {}

	@Post()
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.OK, description: 'Created Tag' })
	async create(@Body() createTagDto: CreateTagDto) {
		const createdTag = await this.tagService.create(createTagDto);
		await this.userService.addTag({
			userId: createdTag.author,
			tagId: createdTag.id
		});
		return createdTag;
	}

	@Get()
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.OK, description: 'Tags array' })
	async findAll(): Promise<Tag[]> {
		return await this.tagService.findAll();
	}

	@Get(':id')
	@ApiResponse({ status: HttpStatus.OK, description: 'Tag' })
	async getById(@Param('id') tagId: string) {
		return await this.tagService.findById(tagId);
	}

	@Put(':id')
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.OK, description: 'Updated Tag' })
	async update(@Param('id') tagId: string, @Body() updateTagDto: UpdateTagDto) {
		return await this.tagService.update(tagId, updateTagDto);
	}

	@Delete(':id')
	@ApiResponse({ status: HttpStatus.OK, description: 'Removed Tag' })
	async remove(@Param('id') tagId: string) {
		const removedTag = await this.tagService.remove(tagId);
		await this.userService.removeTag({
			userId: removedTag.author,
			tagId: removedTag.id
		});
	}
}
