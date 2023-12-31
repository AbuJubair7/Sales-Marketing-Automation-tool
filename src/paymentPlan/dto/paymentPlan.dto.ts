import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentPlanDto {
  @IsNotEmpty()
  @IsString()
  readonly paymentPlan: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentPrice: string;
}
