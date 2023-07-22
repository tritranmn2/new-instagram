import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor() {}

    @Post('login')
    login() {
        return 'login';
    }

    @Post('register')
    register() {
        return 'register';
    }
}
