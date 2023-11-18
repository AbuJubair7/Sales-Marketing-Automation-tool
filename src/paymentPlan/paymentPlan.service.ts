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

//   async findAll() {
//     return this.contactRepo.find();
//   }

//   async updateContact(id: number, data: ContactDto) {
//     return this.contactRepo.update(id, data);
//   }

//   async deleteContact(data: number) {
//     return this.contactRepo.delete(data);
//   }

}
