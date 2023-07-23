import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @Length(8, 20)
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
