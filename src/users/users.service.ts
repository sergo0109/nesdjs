import { Message, Validation } from './validation/validation';
import { CreateUserDto } from './usersDto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './usersDto/update-user.dto';

@Injectable()
export class UsersService extends Validation {
  async create(userDto: CreateUserDto): Promise<string> {
    const validResult: Message = await this.checkUniqueForCreate(
      userDto.userName,
      userDto.email,
      userDto.phone,
    );
    if (!validResult.result) {
      throw new HttpException(validResult.message, HttpStatus.BAD_REQUEST);
    }
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const newUser = new this.userModel(userDto);
    await newUser.save();
    return validResult.message;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this.userModel.find().exec();
    if (users[0]) {
      return users;
    }
    throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
  }

  async getById(id: string): Promise<User> {
    const check: boolean = mongoose.Types.ObjectId.isValid(id);
    if (check) {
      return this.userModel.findById(id);
    }
    throw new HttpException('entered ID unValid', HttpStatus.BAD_REQUEST);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const check: boolean = mongoose.Types.ObjectId.isValid(id);
    if (check) {
      const user: User = await this.userModel.findById(id);
      const validResult: Message = await this.checkForUpdate(
        user,
        updateUserDto,
      );
      if (validResult.result) {
        if (updateUserDto.password) {
          updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            10,
          );
        }
        mongoose.set('useFindAndModify', false);
        await this.userModel.findByIdAndUpdate(id, updateUserDto);
        return validResult.message;
      }
      throw new HttpException(validResult.message, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('entered ID unValid', HttpStatus.BAD_REQUEST);
  }

  async deleteUser(id: string): Promise<string> {
    const check: boolean = mongoose.Types.ObjectId.isValid(id);
    if (check) {
      await this.userModel.findByIdAndDelete(id);
      return 'user deleted';
    }
    throw new HttpException('entered ID unValid', HttpStatus.BAD_REQUEST);
  }
}
