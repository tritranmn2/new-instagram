import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class Comment {
    _id: ObjectId;

    @Prop({ required: true })
    userId: ObjectId;

    @Prop({ required: true })
    postId: ObjectId;

    @Prop({ required: true })
    content: ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
