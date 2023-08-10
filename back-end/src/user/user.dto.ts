import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @Expose()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @Expose()
    // @IsNotEmpty()
    fullName: string;

    // @Expose()
    // @IsNotEmpty()
    // lastName: string;

    // @Expose()
    // @IsNotEmpty()
    // birthday: Date;
}
