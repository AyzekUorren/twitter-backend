import { TagUpdateDto } from './dto/tag-update.dto';
import { UserService } from '../user/user.service';
import { Tag } from './interfaces/tag.interface';
import { TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponseDto } from '../utils/dto/api-response.dto';
import { TagResponseDto } from './dto/tag-response.dto';

@Controller('tag')
@ApiUseTags('tag')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class TagController {
    constructor(
        private readonly tagService: TagService,
        private readonly userService: UserService,
    ) {}

    @Post()
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiCreatedResponse({ description: 'Created Tag', type: TagResponseDto })
    async create(@Body() createTagDto: TagDto, @Req() request) {
        createTagDto.author = request.user.id;
        const createdTag = await this.tagService.create(createTagDto);
        await this.userService.addTag({
            userId: createdTag.author,
            tagId: createdTag.id,
        });
        return new TagResponseDto(createdTag);
    }

    @Get()
    @ApiOkResponse({ description: 'Tags array', type: [TagResponseDto] })
    async findAll() {
        return await this.tagService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Tag', type: TagResponseDto })
    async getById(@Param('id') tagId: string) {
        return await this.tagService.findById(tagId);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Updated Tag', type: TagResponseDto })
    async update(
        @Param('id') tagId: string,
        @Body() updateTagDto: TagUpdateDto,
        @Req() request,
    ) {
        return await this.tagService.update(
            tagId,
            updateTagDto,
            request.user.id,
        );
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Removed Tag', type: ApiResponseDto })
    async remove(@Param('id') tagId: string, @Req() request) {
        const removedTag = await this.tagService.remove(
            tagId,
            request.user._id,
        );
        await this.userService.removeTag({
            userId: removedTag.author,
            tagId: removedTag.id,
        });
        return new ApiResponseDto({
            status: 'ok',
            message: 'tag was removed',
        });
    }
}
