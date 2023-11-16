import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Tracking } from "./tracking.entity";

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  mobile: number;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  address: string;

    @OneToMany(() => Tracking, tracking => tracking.contact)
    tracking: Tracking[];

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}
