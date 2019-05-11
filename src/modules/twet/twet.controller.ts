import { UpdateTwetDto } from './dto/update-twet.dto';
import { TwetTagDTO } from '../../dto/twet-tag.dto';
import { TwetDto } from './dto/create-twet.dto';
import { TwetService } from './twet.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    HttpStatus,
    UseGuards,
    Req,
} from '@nestjs/common';
import { Twet } from './interfaces/twet.interface';
import {
    ApiUseTags,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('twet')
@ApiUseTags('twet')
@ApiBearerAuth()
export class TwetController {
    constructor(
        private readonly userService: UserService,
        private readonly twetService: TwetService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Created Tweet' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async create(@Body() createTwetDto: TwetDto, @Req() request) {
        createTwetDto.author = request.user.id;
        const createdTwet = await this.twetService.create(createTwetDto);

        await this.userService.addTwet({
            userId: createTwetDto.author,
            twetId: createdTwet.id,
        });

        return createdTwet;
    }

    @UseGuards(JwtAuthGuard)
    @Put('tag')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tweet' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async addTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
        return await this.twetService.addTag(twetTagDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tweet' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async update(
        @Param('id') twetId: string,
        @Body() updateTwetDto: UpdateTwetDto,
        @Req() request,
    ): Promise<Twet> {
        return await this.twetService.update(
            twetId,
            updateTwetDto,
            request.user.id,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete('tag')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tweet' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async removeTag(@Body() twetTagDto: TwetTagDTO): Promise<Twet> {
        return await this.twetService.removeTag(twetTagDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Removed Tweet' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async remove(@Param('id') twetId: string) {
        const removedTwet = await this.twetService.remove(twetId);

        if (removedTwet && removedTwet.author) {
            await this.userService.removeTwet({
                userId: removedTwet.author,
                twetId: removedTwet.id,
            });
        }

        return { status: 'ok', message: 'Twet was removed' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Twets array' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async findAll(): Promise<Twet[]> {
        return await this.twetService.findAll();
    }
}
