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
    HttpStatus,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiResponse,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiBearerAuth,
    ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponseStatusDto } from '../utils/dto/ApiResponseStatus.dto';

@Controller('tag')
@ApiUseTags('tag')
@ApiBearerAuth()
export class TagController {
    constructor(
        private readonly tagService: TagService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiCreatedResponse({ description: 'Created Tag' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async create(@Body() createTagDto: TagDto, @Req() request) {
        createTagDto.author = request.user.id;
        const createdTag = await this.tagService.create(createTagDto);
        await this.userService.addTag({
            userId: createdTag.author,
            tagId: createdTag.id,
        });
        return createdTag;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Tags array' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async findAll(): Promise<Tag[]> {
        return await this.tagService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Tag' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async getById(@Param('id') tagId: string) {
        return await this.tagService.findById(tagId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated Tag' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Removed Tag', type: ApiResponseStatusDto })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async remove(@Param('id') tagId: string, @Req() request) {
        const removedTag = await this.tagService.remove(
            tagId,
            request.user._id,
        );
        await this.userService.removeTag({
            userId: removedTag.author,
            tagId: removedTag.id,
        });
        return new ApiResponseStatusDto({
            status: 'ok',
            message: 'tag was removed',
        });
    }
}
