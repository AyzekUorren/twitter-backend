import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
    Controller,
    Get,
    Body,
    Param,
    Delete,
    HttpStatus,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import {
    ApiUseTags,
    ApiResponse,
    ApiBearerAuth,
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiResponseDto } from '../utils/dto/api-response.dto';

@Controller('user')
@ApiUseTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class UserController {
    constructor(private readonly userService: UserService) {}

    async create(@Body() userDto: UserDto) {
        return await this.userService.create(userDto);
    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Users array',
        type: [UserResponseDto],
    })
    async findAll(): Promise<UserResponseDto[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'Detailed User model',
        type: UserResponseDto,
    })
    async findById(@Param('id') userId: string) {
        return await this.userService.findById(userId);
    }

    @Put(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({ description: 'Updated User', type: UserResponseDto })
    async update(
        @Param('id') userId: string,
        @Body() userUpdateDto: UserUpdateDto,
    ) {
        return await this.userService.update(userId, userUpdateDto);
    }

    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({
        description: 'User and all related objects are deleted.',
        type: ApiResponseDto,
    })
    async remove(@Param('id') userId: string) {
        await this.userService.remove(userId);
        return new ApiResponseDto({
            status: 'ok',
            message: 'User and all related objects are deleted.',
        });
    }
}
