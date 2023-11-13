import { IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly cgpa: string;
}