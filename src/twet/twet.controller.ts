import { TwetUpdateDto } from './dto/twet-update.dto';
import { TwetTagDTO } from './dto/twet-tag.dto';
import { TwetDto } from './dto/twet.dto';
import { TwetService } from './twet.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiUnauthorizedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TwetResponseDto } from './dto/twet-response.dto';
import { ApiResponseDto } from '../utils/dto/api-response.dto';

@Controller('twet')
@ApiUseTags('twet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class TwetController {
    constructor(
        private readonly userService: UserService,
        private readonly twetService: TwetService,
    ) {}

    @Post()
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'Created Tweet',
        type: TwetResponseDto,
    })
    async create(@Body() createTwetDto: TwetDto, @Req() request) {
        createTwetDto.author = request.user.id;
        const createdTwet = await this.twetService.create(createTwetDto);

        await this.userService.addTwet({
            userId: createTwetDto.author,
            twetId: createdTwet.id,
        });

        return createdTwet;
    }

    @Put('tag')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'Updated Tweet',
        type: TwetResponseDto,
    })
    async addTag(@Body() twetTagDto: TwetTagDTO) {
        return await this.twetService.addTag(twetTagDto);
    }

    @Put(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'Updated Tweet',
        type: TwetResponseDto,
    })
    async update(
        @Param('id') twetId: string,
        @Body() updateTwetDto: TwetUpdateDto,
        @Req() request,
    ) {
        return await this.twetService.update(
            twetId,
            updateTwetDto,
            request.user.id,
        );
    }

    @Delete('tag')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'Updated Tweet',
        type: TwetResponseDto,
    })
    async removeTag(@Body() twetTagDto: TwetTagDTO) {
        return await this.twetService.removeTag(twetTagDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Removed Tweet',
        type: TwetResponseDto,
    })
    @ApiOkResponse({ description: 'OK', type: ApiResponseDto })
    async remove(@Param('id') twetId: string) {
        const removedTwet = await this.twetService.remove(twetId);

        if (removedTwet && removedTwet.author) {
            await this.userService.removeTwet({
                userId: removedTwet.author,
                twetId: removedTwet.id,
            });
        }

        return new ApiResponseDto({
            status: 'ok',
            message: 'Twet was removed',
        });
    }

    @Get()
    @ApiOkResponse({
        description: 'Twets array',
        type: [TwetResponseDto],
    })
    async findAll() {
        return await this.twetService.findAll();
    }
}
