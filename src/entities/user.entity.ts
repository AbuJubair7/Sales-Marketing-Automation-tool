import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Payment } from './payment.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }
  // @BeforeUpdate()
  // async updateHash() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  @OneToMany(() => Payment, (payment) => payment.User)
  payment: Payment[];
}
