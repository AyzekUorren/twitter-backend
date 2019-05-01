import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().populate('twets').exec();
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async addTwet(userId: string, twetId: string): Promise<User> {
    const currentUser = await this.userModel.findById(userId).exec();
    currentUser.twets.push(twetId)
    return await currentUser.save();
  }
}
