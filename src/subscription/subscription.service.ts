import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscriber = await this.subscriptionRepo.create(
      createSubscriptionDto,
    );
    return await this.subscriptionRepo.save(subscriber);
  }

  async findAll() {
    return await this.subscriptionRepo.find();
  }

  async findOne(id: number) {
    return await this.subscriptionRepo.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.subscriptionRepo.update(id, updateSubscriptionDto);
  }

  async remove(id: number) {
    return await this.subscriptionRepo.delete(id);
  }
}
