import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber('BD')
  @IsNotEmpty()
  readonly mobile: number;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
