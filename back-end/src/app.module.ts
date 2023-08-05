import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PostModule,
        AuthModule,
        UserModule,
        MongooseModule.forRoot('mongodb://localhost:27018/new_instagram'),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
