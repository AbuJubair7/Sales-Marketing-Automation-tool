import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ContactDto{
    @IsNotEmpty()
    @IsString()
    readonly link: string;  

    @IsNotEmpty()
    @IsDate()
    readonly click_timestamp: Date;
}