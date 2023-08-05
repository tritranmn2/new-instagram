import { Expose, Transform, plainToClass } from 'class-transformer';
import { ObjectId, Types } from 'mongoose';

export abstract class BaseDto {
    @Expose()
    @Transform(({ obj }) => {
        const rs = obj._id == undefined ? null : new Types.ObjectId(obj._id.toString());
        // console.log('rs:', rs);
        return rs;
    })
    _id: ObjectId;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    static async plainToClass<T>(cls: new () => T, plain: any): Promise<T> {
        return await plainToClass(cls, plain, { excludeExtraneousValues: true });
    }

    static async plainToClassArray<T>(cls: new () => T, plains: any[]): Promise<T[]> {
        return await plainToClass(cls, plains, { excludeExtraneousValues: true });
    }
}
