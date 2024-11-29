import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/users.schema';
import { Model } from 'mongoose';
import { AppLogger } from '../../logger/logger.service';
import { UserCreateDto } from '../dto/users-create.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('UserService');
  }

  async findOneByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findOneById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id).exec();
  }

  async createUser(user: UserCreateDto): Promise<UserDto> {
    const newUser = new this.userModel(user);
    this.logger.log(`Created User: ${JSON.stringify(newUser.username)}`);
    return await newUser.save();
  }

  async deleteUser(user: UserDto): Promise<UserDto> {
    return await this.userModel
      .findOneAndDelete({ username: user.username })
      .exec();
  }

  async findUsersByName(name: string): Promise<UserDto[]> {
    return await this.userModel
      .find({
        username: { $regex: name, $options: 'i' },
      })
      .exec();
  }
}
