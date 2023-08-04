import { BaseDto } from 'src/common/base.dto';
import { ObjectId, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UserDto } from 'src/user/user.dto';
import { Expose, Transform } from 'class-transformer';

export class PostDto extends BaseDto {
    @Expose()
    @Transform(({ obj }) => {
        const rs = obj._id == undefined ? null : new Types.ObjectId(obj.userId.toString());
        // console.log('rs:', rs);
        return rs;
    })
    userId: ObjectId;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    image: string;
}
