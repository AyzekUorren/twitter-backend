import { UpdateTagDto } from './../tag/dto/update-tag.dto';
import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiUseTags('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	@Get(':id')
	async findById(@Param('id') userId: string): Promise<User> {
		return await this.userService.findById(userId);
	}

	@Put(':id')
	async update(@Param('id') userId: string, @Body() updateTagDto: UpdateTagDto): Promise<User> {
		return await this.userService.update(userId, updateTagDto);
	}

	@Delete(':id')
	@ApiResponse({ status: HttpStatus.OK, description: 'User and all related objects are deleted.' })
	async remove(@Param('id') userId: string) {
		await this.userService.remove(userId);
	}
}
