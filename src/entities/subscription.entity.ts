import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  paymentId: number;

  @Column({ nullable: false })
  subscriberId: number;

  @Column({ nullable: false })
  plan: string;

  @Column({ nullable: false })
  start: string;

  @Column({ nullable: false })
  end: string;

  @Column({ nullable: false })
  status: boolean;
}
