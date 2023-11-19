import { Body, Controller, Post } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('plan/PaymentDto')
  async purchasePlan(@Body() data: PaymentDto) {
    await this.service.purchasePlan(data);
    return 'Payment successful!';
  }
}
