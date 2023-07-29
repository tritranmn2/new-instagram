import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { HashService } from './user/hash.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://localhost/dbmongo_new_instagram')],
    controllers: [],
    providers: [],
})
export class AppModule {}
