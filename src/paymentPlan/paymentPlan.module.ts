import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { PaymentPlan } from 'src/entities/paymentPlan.entity';
import { PaymentPlanController } from './paymentPlan.controller';
import { PaymentPlanService } from './paymentPlan.service';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentPlan])],
    controllers: [PaymentPlanController],
    providers: [PaymentPlanService],
})
export class PaymentPlanModule {}
