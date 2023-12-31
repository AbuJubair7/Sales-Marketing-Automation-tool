import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class PaymentPlan {
  @PrimaryGeneratedColumn()
  planId: number;

  @Column({ unique: true, nullable: false })
  paymentPlan: string; // 'basic', 'ultra', 'premium'

  @Column({ nullable: false })
  paymentPrice: string;

  @OneToMany(() => Payment, (payment) => payment.paymentPlan)
  payment: Payment[];
}
