import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { CustomLogger, CustomLoggerType } from 'src/logger';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
const logger = CustomLogger('UserService');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async login(user: UserDto) {
        const log = logger('login');
        // log(user);
        const userReal = await UserDto.plainToClass(UserDto, user);
        // log(userReal);
        return userReal;
    }

    async create(user: UserDto): Promise<UserDto> {
        const log = logger('createUser');
        const newUser = new this.userModel(user);
        log('newuser:', newUser);
        const userDto = await UserDto.plainToClass(UserDto, await newUser.save());
        log('userDto:', userDto);
        return userDto;
    }

    async findAll(): Promise<UserDto[]> {
        const log = logger('findAll');
        const users = await this.userModel.find().exec();
        const userDtos = await UserDto.plainToClassArray(UserDto, users);
        return userDtos;
    }

    async findById(_id: string): Promise<UserDto> {
        const log = logger('findById');
        // log('_id:', _id);
        const user = await this.userModel.findById(_id).exec();
        log('user:', user);
        const userDto = await UserDto.plainToClass(UserDto, user);
        log('userDto:', userDto);
        return userDto;
    }

    async update(_id: string) {
        const log = logger('update');
        // log(user);
    }

    async delete(user: User) {
        const log = logger('delete');
        // log(user);
    }
}
