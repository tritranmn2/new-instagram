import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Module } from '@nestjs/common';
import { Post, PostSchema } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
