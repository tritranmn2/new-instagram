import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
})
export class User {
    _id: ObjectId;

    @Prop({ required: true, unique: true, index: true })
    username: string;

    @Prop({ required: true })
    password: string;

    // @Prop({ type: Date, default: Date.now() })
    // createdAt: Date;

    // @Prop({ type: Date, default: null })
    // deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
