import { TwetTagDTO } from './dto/twetTag.dto';
import { CreateTwettDto } from './dto/create-twet.dto';
import { TwetService } from './twet.service';
import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { Twet } from './interfaces/twet.interface';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('twet')
@ApiUseTags('twet')
export class TwetController {
  constructor(private readonly twetService: TwetService) {}

  @Post()
  async create(@Body() createTwettDto: CreateTwettDto) {
    return this.twetService.create(createTwettDto);
  }

  @Put('addTag')
  async addTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
    return this.twetService.addTag(twetTagDto);
  }

  @Delete('removeTag')
  async removeTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
    return this.twetService.removeTag(twetTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') twetId: string) {
    await this.twetService.remove(twetId);
  }

  @Get()
  async findAll(): Promise<Twet[]> {
    return this.twetService.findAll();
  }
}
