import { TwetTagDTO } from '../main/dto/twet-tag.dto';
import { CreateTwetDto } from './dto/create-twet.dto';
import { TwetService } from './twet.service';
import { Controller, Get, Post, Body, Delete, Param, Put, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { Twet } from './interfaces/twet.interface';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@Controller('twet')
@ApiUseTags('twet')
export class TwetController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly twetService: TwetService,
  ) {}

  @Post()
  async create(@Body() createTwetDto: CreateTwetDto) {
    const createdTwet = await this.twetService.create(createTwetDto);

    await this.userService.addTwet({
      userId: createTwetDto.author,
      twetId: createdTwet.id,
    });

    return createdTwet;
  }

  @Put('addTag')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tweet'})
  async addTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
    return await this.twetService.addTag(twetTagDto);
  }

  @Delete('removeTag')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request'})
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tweet'})
  async removeTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
    return await this.twetService.removeTag(twetTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') twetId: string) {
    const removedTwet = await this.twetService.remove(twetId);

    if (removedTwet || removedTwet.author) {
      await this.userService.removeTwet({
        userId: removedTwet.author,
        twetId: removedTwet.id,
      });
    }
  }

  @Get()
  async findAll(): Promise<Twet[]> {
    return await this.twetService.findAll();
  }
}
