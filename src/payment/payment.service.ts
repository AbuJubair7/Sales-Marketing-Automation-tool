import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { PaymentPlan } from 'src/entities/paymentPlan.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(PaymentPlan)
    private readonly paymentPlanRepo: Repository<PaymentPlan>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async purchasePlan(data: any) {
    const buyer = await this.userRepo.findOne({ where: { email: data.email } });
    const selectedPlan = await this.paymentPlanRepo.findOne({ where: { paymentPlan: data.paymentPlan } });
    if (!buyer || !selectedPlan) {
      throw new NotFoundException('Payment requirements not found');
    }
    try{
      const data = { ...buyer, ...selectedPlan, paymentDate: new Date() };
      const pay = await this.paymentRepo.create(data);
      return await this.paymentRepo.save(pay);
    }catch{
      throw new NotFoundException('Payment failed');
    } 
  }
}
