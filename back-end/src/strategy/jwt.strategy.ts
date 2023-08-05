import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant/jwt.constant';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('JwtStrategy');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    // async validate(payload) {
    //     const log = logger('validate');
    //     log('payload:', payload);
    //     return {
    //         userId: payload.sub,
    //         username: payload.username,
    //     };
    // }
}
