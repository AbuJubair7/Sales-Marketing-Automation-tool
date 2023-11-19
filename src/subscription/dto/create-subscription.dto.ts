import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  readonly paymentId: number;

  @IsNumber()
  readonly subscriberId: number;

  @IsString()
  readonly plan: string;

  @IsNotEmpty()
  readonly start: string;

  @IsNotEmpty()
  readonly end: string;

  @IsBoolean()
  readonly status: boolean;
}
