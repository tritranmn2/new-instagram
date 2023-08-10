import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PostModule,
        AuthModule,
        UserModule,
        MongooseModule.forRoot('mongodb://localhost:27018/new_instagram'),
        CommentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
