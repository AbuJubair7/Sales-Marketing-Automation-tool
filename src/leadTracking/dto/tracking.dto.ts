import { IsEmail, IsNotEmpty } from "class-validator";

export class TrackingDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;  
}