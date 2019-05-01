import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('tag')
@ApiUseTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }
}
