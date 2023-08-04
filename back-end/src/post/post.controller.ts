import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { Post as PostContent } from './post.schema';
import { CustomLogger } from 'src/logger';
import { Message } from 'src/type/message.type';
const logger = CustomLogger('PostController');
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post('')
    async createPost(@Body() post: PostDto) {
        const log = logger('createPost');
        try {
            const savedPost = await this.postService.createPost(post);
            log('savedPost:', savedPost);
            return new Message(HttpStatus.CREATED, 'Created post success', savedPost);
        } catch (error) {
            throw new BadRequestException(new Message(HttpStatus.CONFLICT, error.message));
        }
    }

    @Get('')
    async getAllPosts() {
        const log = logger('getAllPosts');
        const posts = await this.postService.getAllPosts();
        log('posts:', posts);
        return posts;
    }

    @Get('id/:_id')
    async getPostById(@Param('_id') _id: string) {
        const log = logger('getPostById');
        const post = await this.postService.getPostById(_id);
        log('post:', post);
        return post;
    }

    @Get('userId/:userId')
    async getPostByUserId(@Param('userId') userId: string) {
        const log = logger('getPostById');
        const post = await this.postService.getPostByUserId(userId);
        log('post:', post);
        return post;
    }

    @Get('filter')
    async getPosts(@Body() post: PostContent) {
        const log = logger('getPosts');
        const posts = await this.postService.getPosts(post);
        log('posts:', posts);
        return posts;
    }

    @Put('update/:_id')
    async updatePost(@Param('_id') _id: string, @Body() post: PostDto) {
        const log = logger('updatePost');
        try {
            const updatedInfo = await this.postService.updatePost(_id, post);
            return new Message(HttpStatus.OK, 'Updated post success', updatedInfo);
        } catch (error) {
            throw new BadRequestException(new Message(HttpStatus.CONFLICT, error.message));
        }
    }

    @Delete('delete/:_id')
    async deletePost(@Param('_id') _id: string) {
        const log = logger('deletePost');
        try {
            const deletedInfo = await this.postService.deletePost(_id);
            log('deletedInfo:', deletedInfo);
            return new Message(HttpStatus.OK, 'Deleted post success', deletedInfo);
        } catch (error) {
            throw new BadRequestException(new Message(HttpStatus.NOT_FOUND, error.message));
        }
    }
}
