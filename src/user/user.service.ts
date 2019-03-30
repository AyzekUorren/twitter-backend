import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
