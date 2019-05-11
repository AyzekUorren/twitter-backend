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
import { User } from './interfaces/user.interface';
import {
    ApiUseTags,
    ApiResponse,
    ApiBearerAuth,
    ApiBadRequestResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/response.user.dto';

@Controller('user')
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    async create(@Body() createUserDto: UserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Users array' })
    async findAll(): Promise<UserResponse[]> {
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
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.update(userId, updateUserDto);
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
