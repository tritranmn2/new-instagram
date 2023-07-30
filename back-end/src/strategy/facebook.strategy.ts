import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-facebook';
import { UserService } from 'src/user/user.service';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('FacebookStrategy');
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        const log = logger('constructor');
        log('clientID:', process.env.APP_ID);
        log('clientSecret:', process.env.APP_SECRET);
        super({
            clientID: process.env.APP_ID,
            clientSecret: process.env.APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/redirect',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user: any, info?: any) => void,
    ): Promise<any> {
        const log = logger('validate');
        const { name, emails } = profile;
        log('emails:', emails);
        log('profile:', profile);
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const payload = { user, accessToken };
        done(null, payload);
    }
}
