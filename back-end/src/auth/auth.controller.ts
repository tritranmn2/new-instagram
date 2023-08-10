import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Get,
    Req,
    UseGuards,
    BadRequestException,
    Res,
    HttpCode,
    ConflictException,
    Redirect,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
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
    @Post('test')
    @HttpCode(HttpStatus.OK)
    async test(@Res() res: Response, @Body() dataTest: any) {
        const log = logger('test');
        log('dataTest:', dataTest);
        return res.status(200).json(dataTest);
        // throw new ConflictException(new Message(HttpStatus.CONFLICT, 'fake message'));
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Res() res: Response, @Body() user: UserDto) {
        const log = logger('create');
        log('user:', user);
        try {
            const createdUser = await this.userService.createUser(user);
            const message: Message = new Message(HttpStatus.CREATED, 'Created user success', createdUser);
            return res.json(message);
        } catch (error) {
            throw new BadRequestException(new Message(HttpStatus.BAD_REQUEST, error.message));
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async login(@Res() res: Response, @Body() user: UserDto) {
        const log = logger('login');
        log('user:', user);
        const accessTokenObject = await this.authService.signAccessToken(user);
        res.json(accessTokenObject);
    }

    @Get('facebook/login')
    @UseGuards(AuthGuard('facebook'))
    // @HttpCode(HttpStatus.OK)
    async facebookLogin(@Res() res: Response) {
        const log = logger('facebookLogin');
        log('facebookLogin:', true);
        // return res.json(HttpStatus.OK);
    }

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    @HttpCode(HttpStatus.OK)
    async facebookLoginRedirect(@Res() res: Response, @Req() req: Request) {
        const log = logger('facebookLoginRedirect');
        log('user:', req.user);
        const jwt = await this.authService.signAccessToken(req.user);
        const cookieOptions = {
            httpOnly: false,
            sameSite: 'none',
            secure: true,
        } as CookieOptions;
        res.set('authorization', jwt.access_token);
        res.cookie('authorization', JSON.stringify(jwt.access_token));
        res.cookie('data', JSON.stringify(req.user), cookieOptions);
        // res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify(req.user), cookieOptions));
        // res.json({
        //     // statusCode: HttpStatus.OK,
        //     data: req.user,
        //     // access_token: jwt.access_token,
        // });
        res.redirect('http://localhost:3001');
    }
}
