import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  @Length(4, 100, { message: 'Password must be between 8 and 100 characters' })
  password: string;

  @IsString()
  role: string;
}
