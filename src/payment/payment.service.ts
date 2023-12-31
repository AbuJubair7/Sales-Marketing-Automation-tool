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

  async purchasePlan(userData: any) {
    const buyer = await this.userRepo.findOne({
      where: { email: userData.email },
    });
    const selectedPlan = await this.paymentPlanRepo.findOne({
      where: { paymentPlan: userData.paymentPlan },
    });
    if (!buyer || !selectedPlan) {
      throw new NotFoundException('Payment requirements not found');
    }
    try {
      const data = {
        email: buyer.email,
        paymentPlan: selectedPlan.paymentPlan,
        paymentDate: new Date(),
        status: true,
      };
      const pastTransaction = await this.paymentRepo.findOne({
        where: { email: buyer.email },
      });
      if (pastTransaction) {
        return await this.update(data, buyer.email);
      }
      const pay = await this.paymentRepo.create(data);
      return await this.paymentRepo.save(pay);
    } catch {
      throw new NotFoundException('Payment failed');
    }
  }

  async find(data: string) {
    const user = await this.userRepo.findOne({ where: { email: data } });
    if (!user) {
      throw new NotFoundException('User not found'); // 404
    }
    const payment = await this.paymentRepo.findOne({
      where: { email: user.email },
    });
    console.log(payment);
    if (payment) {
      return payment;
    }
    throw new NotFoundException('Payment not found');
  }

  async update(data: any, email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found'); // 404
    }
    const payment = await this.paymentRepo.findOne({
      where: { email: user.email },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found'); // 404
    }
    payment.paymentPlan = data.paymentPlan;
    return await this.paymentRepo.update({ email: user.email }, payment);
  }
}
