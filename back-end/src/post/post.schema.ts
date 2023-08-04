import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Post {
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userId: ObjectId;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
