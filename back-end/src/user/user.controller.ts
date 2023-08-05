import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CustomLogger } from 'src/logger';
import { AuthGuard } from '@nestjs/passport';
import { Message } from 'src/type/message.type';
const logger = CustomLogger('UserController');
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<UserDto[]> {
        const log = logger('getAllUsers');
        log("I'm in");
        return await this.userService.getAllUsers();
    }

    @Get('username/:username')
    async getUserByUsername(@Param('username') username: string) {
        const log = logger('getUserByUsername');
        log('username:', username);
        const user = await this.userService.getUserByUsername(username);
        if (user === null) {
            throw new NotFoundException(new Message(HttpStatus.NOT_FOUND, 'User not found'));
        }
        return user;
    }

    @Get('id/:_id')
    async getUserById(@Param('_id') _id: string) {
        const log = logger('getUserById');
        log('_id', _id);

        const user = await this.userService.getUserById(_id);
        if (user === null) {
            throw new NotFoundException(new Message(HttpStatus.NOT_FOUND, 'User not found'));
        }
        return user;
    }

    @Put('update/:_id')
    async updateUser(@Param('_id') _id: string, @Body() user: UserDto) {
        const log = logger('updateUser');
        log('user:', user);
        try {
            const updatedInfo = await this.userService.updateUser(_id, user);
            return new Message(HttpStatus.OK, 'Updated user success', updatedInfo);
        } catch (error) {
            throw new ConflictException(new Message(HttpStatus.CONFLICT, error.message));
        }
    }

    @Delete('delete/:_id')
    async deleteUser(@Param('_id') _id: string): Promise<any> {
        const log = logger('deleteUser');
        log('_id:', _id);
        try {
            const deletedInfo = await this.userService.deleteUser(_id);
            return new Message(HttpStatus.OK, 'Deleted user success', deletedInfo);
        } catch (error) {
            throw new NotFoundException(new Message(HttpStatus.NOT_FOUND, error.message));
        }
    }
}
