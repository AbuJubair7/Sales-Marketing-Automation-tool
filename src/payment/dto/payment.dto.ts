import { IsEmail, IsNotEmpty } from "class-validator";

export class PaymentDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string; 
    
    @IsNotEmpty()
    readonly paymentPlan: string;  
}