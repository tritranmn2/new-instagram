import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { jwtConstants } from 'src/constant/jwt.constant';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { FacebookStrategy } from 'src/strategy/facebook.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60d',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, HashService, LocalStrategy, JwtStrategy, FacebookStrategy],
})
export class AuthModule {}
