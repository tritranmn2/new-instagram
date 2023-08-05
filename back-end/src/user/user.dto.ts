import { Expose } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
    @Expose()
    @IsNotEmpty()
    @Length(5, 20)
    username: string;

    @Expose()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    // @Expose()
    // @IsNotEmpty()
    // fistName: string;

    // @Expose()
    // @IsNotEmpty()
    // lastName: string;

    // @Expose()
    // @IsNotEmpty()
    // birthday: Date;
}
