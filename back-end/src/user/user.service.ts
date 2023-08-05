import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { CustomLogger, CustomLoggerType } from 'src/logger';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { HashService } from './hash.service';
import { toClass } from 'src/common/decorator';
const logger = CustomLogger('UserService');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private hashService: HashService) {}

    async getUserByUsername(username: string): Promise<UserDto> {
        const log = logger('getUserByUserName');
        const user = await this.userModel.findOne({ username }).exec();
        const userDto = await UserDto.plainToClass(UserDto, user);
        return userDto;
    }

    async getAllUsers(): Promise<UserDto[]> {
        const log = logger('getAllUsers');
        const users = await this.userModel.find().exec();
        const userDtos = await UserDto.plainToClassArray(UserDto, users);
        return userDtos;
    }

    async getUserById(_id: string): Promise<UserDto> {
        const log = logger('getUserById');
        // log('_id:', _id);
        const user = await this.userModel.findById(_id).exec();
        log('user:', user);
        const userDto = await UserDto.plainToClass(UserDto, user);
        log('userDto:', userDto);
        return userDto;
    }

    async createUser(user: UserDto): Promise<UserDto> {
        const log = logger('createUser');
        const newUser = new this.userModel(user);
        newUser.password = await this.hashService.hashPassword(newUser.password);
        // log('newuser:', newUser);
        const userDto = await UserDto.plainToClass(UserDto, await newUser.save());
        log('userDto:', userDto);
        return userDto;
    }

    async updateUser(_id: string, user: User) {
        const log = logger('update');
        const updatedUser = await this.userModel.updateOne({ _id }, user);
        log(updatedUser);
        return updatedUser;
    }

    async deleteUser(_id: string) {
        const log = logger('deleteUser');
        const deleteUser = await this.userModel.deleteOne({ _id });
        log('deleteUser:', deleteUser);
        return deleteUser;
    }
}
