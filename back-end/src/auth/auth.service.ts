import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';
import { UserService } from 'src/user/user.service';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('AuthService');

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string) {
        const log = logger('validateUser');
        log('username:', username);
        const user = await this.userService.getUserByUsername(username);
        if (user && (await this.hashService.comparePassword(password, user.password))) return user;
        return null;
    }

    async login(user) {
        const log = logger('login');
        log('user:', user);
        const payload = {
            username: user.username,
            sub: user._id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
