import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  readonly paymentPlan: string;
}
