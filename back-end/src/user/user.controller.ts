import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CustomLogger } from 'src/logger';
import { AuthGuard } from '@nestjs/passport';
const logger = CustomLogger('UserController');
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post('login')
    // async login(@Body() user: UserDto) {
    //     const log = logger('login');
    //     return await this.userService.login(user);
    // }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const log = logger('getUserByUsername');
        log('username:', username);
        return await this.userService.getUserByUsername(username);
    }
    // @UseGuards(AuthGuard('jwt'))
    // @Post('register')
    // async create(@Body() user: UserDto): Promise<UserDto> {
    //     const log = logger('create');
    //     log('user:', user);
    //     return await this.userService.create(user);
    // }

    @Get()
    async findAll(): Promise<UserDto[]> {
        const log = logger('findAll');
        // log('this');
        return await this.userService.findAll();
    }

    @Get(':_id')
    async findById(@Param('_id') _id: string) {
        const log = logger('findById');
        log('_id', _id);
        return await this.userService.findById(_id);
    }

    // @Put(':_id')
    // async update(@Body() user: User): Promise<UserDto> {
    //     const log = logger('updateUser');
    //     // log(user);
    //     return await this.userService.create(user);
    // }

    // @Delete(':_id')
    // async delete(@Body() user: User): Promise<UserDto> {
    //     const log = logger('createUser');
    //     // log(user);
    //     return await this.userService.create(user);
    // }
}
