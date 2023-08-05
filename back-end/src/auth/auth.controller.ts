import { Body, Controller, HttpStatus, Post, Get, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { CustomLogger } from 'src/logger';
import { Message } from 'src/type/message.type';
const logger = CustomLogger('AuthController');

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}
    @Post('register')
    async create(@Body() user: UserDto): Promise<Message> {
        const log = logger('create');
        log('user:', user);
        try {
            const createdUser = await this.userService.createUser(user);
            return new Message(HttpStatus.CREATED, 'Created user success', createdUser);
        } catch (error) {
            throw new BadRequestException(new Message(HttpStatus.BAD_REQUEST, error.message));
        }
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Body() user: UserDto) {
        const log = logger('login');
        log('user:', user);
        return this.authService.signAccessToken(user);
    }

    @Get('facebook/login')
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(): Promise<any> {
        const log = logger('facebookLogin');
        log('facebookLogin:', true);
        return HttpStatus.OK;
    }

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
        const log = logger('facebookLoginRedirect');
        log('facebookLoginRedirect:', true);
        return {
            statusCode: HttpStatus.OK,
            data: req.user,
        };
    }
}
