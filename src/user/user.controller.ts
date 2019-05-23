import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
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
} from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    async create(@Body() userDto: UserDto) {
        return await this.userService.create(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Users array' })
    async findAll(): Promise<UserResponseDto[]> {
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({ description: 'Detailed User model' })
    async findById(@Param('id') userId: string) {
        return await this.userService.findById(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({ description: 'Updated User' })
    async update(
        @Param('id') userId: string,
        @Body() userUpdateDto: UserUpdateDto,
    ) {
        return await this.userService.update(userId, userUpdateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiOkResponse({ description: 'User and all related objects are deleted.' })
    async remove(@Param('id') userId: string) {
        await this.userService.remove(userId);
        return {
            status: 'ok',
            message: 'User and all related objects are deleted.',
        };
    }
}
