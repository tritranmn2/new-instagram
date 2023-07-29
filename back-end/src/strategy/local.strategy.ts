import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('LocalStrategy');

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(username: string, password: string) {
        const log = logger('validate');
        log('username:', username, 'password:', password);
        log('authService:', this.authService);
        const user = await this.authService.validateUser(username, password);
        log('user:', user);
        if (!user) {
            throw new UnauthorizedException({
                message: 'You have entered a wrong username or password',
            });
        }
        return user;
    }
}
