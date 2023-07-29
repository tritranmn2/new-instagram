import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('AuthController');

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() user: UserDto) {
        const log = logger('login');
        log('user:', user);
        return this.authService.login(user);
    }

    @Post('register')
    async create(@Body() user: UserDto): Promise<UserDto> {
        const log = logger('create');
        log('user:', user);
        return await this.userService.create(user);
    }
}
