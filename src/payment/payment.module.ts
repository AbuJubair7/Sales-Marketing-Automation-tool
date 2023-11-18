import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { PaymentPlan } from 'src/entities/paymentPlan.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment,PaymentPlan,User])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
