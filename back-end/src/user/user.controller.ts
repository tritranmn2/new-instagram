import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post('login')
    login() {
        return 'login';
    }

    @Post('register')
    createUser() {
        return 'login';
    }
}
