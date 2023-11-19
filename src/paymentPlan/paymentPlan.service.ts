import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentPlan } from "src/entities/paymentPlan.entity";
import { Repository } from "typeorm";
import { PaymentPlanDto } from "./dto/paymentPlan.dto";

@Injectable()
export class PaymentPlanService {
  constructor(
    @InjectRepository(PaymentPlan)
    private readonly paymentPlanRepo: Repository<PaymentPlan>,
  ) {}

  async createPaymentPlan(data: PaymentPlanDto) {
    const paymentPlanData = await this.paymentPlanRepo.create(data);
    return await this.paymentPlanRepo.save(paymentPlanData);
  }

  async findAll() {
    return this.paymentPlanRepo.find();
  }

  async updatePlan(planId: number, data: PaymentPlanDto) {
    return this.paymentPlanRepo.update(planId, data);
  }

//   async deleteContact(data: number) {
//     return this.contactRepo.delete(data);
//   }

}
