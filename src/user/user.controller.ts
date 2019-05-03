import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiUseTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Created User' })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Users array' })
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Detailed User model' })
    async findById(@Param('id') userId: string): Promise<User> {
        return await this.userService.findById(userId);
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated User' })
    async update(
        @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.update(userId, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User and all related objects are deleted.',
    })
    async remove(@Param('id') userId: string) {
        await this.userService.remove(userId);
    }
}
