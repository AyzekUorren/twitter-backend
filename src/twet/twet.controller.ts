import { CreateTwettDto } from './dto/create-twet.dto';
import { TwetService } from './twet.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
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

  @Get()
  async findAll(): Promise<Twet[]> {
    return this.twetService.findAll();
  }
}
