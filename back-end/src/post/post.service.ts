import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.schema';
import { Model } from 'mongoose';
import { PostDto } from './post.dto';
import { CustomLogger } from 'src/logger';
const logger = CustomLogger('PostService');

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async createPost(post: PostDto) {
        const log = logger('createPost');
        const postSave = new this.postModel(post);
        const postDto = await PostDto.plainToClass(PostDto, await postSave.save());
        // log('postDto:',postDto)
        return postDto;
    }

    async getAllPosts() {
        const log = logger('getAllPosts');
        const posts = await this.postModel.find().exec();

        log('posts:', posts);
        const postDtos = await PostDto.plainToClassArray(PostDto, posts);
        log('postDtos:', postDtos);
        return postDtos;
    }

    async getPostById(_id: string) {
        const log = logger('getPostById');
        const post = await this.postModel.findOne({ _id }).exec();

        const postDto = await PostDto.plainToClass(PostDto, post);
        log('postDto:', postDto);
        return postDto;
    }

    async getPostByUserId(userId: string) {
        const log = logger('getPostById');
        const post = await this.postModel.findOne({ userId }).exec();

        const postDto = await PostDto.plainToClass(PostDto, post);
        log('postDto:', postDto);
        return postDto;
    }

    async getPosts(post: Post) {
        const log = logger('getPosts');
        const posts = await this.postModel.find(post).exec();
        const postDtos = await PostDto.plainToClassArray(PostDto, posts);
        // log('postDtos:',postDtos)
        return postDtos;
    }

    async updatePost(_id: string, post: Post) {
        const log = logger('updatePost');
        const updatedInfo = await this.postModel.updateOne({ _id }, post).exec();
        log('updatedInfo:', updatedInfo);
        return updatedInfo;
    }

    async deletePost(_id: string) {
        const log = logger('deletePost');
        const deletedInfo = await this.postModel.deleteOne({ _id }).exec();
        log('deletedInfo:', deletedInfo);
        return deletedInfo;
    }
}
