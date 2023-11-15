import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // @BeforeInsert()
  // async hashPassword() {
  //     this.password = await bcrypt.hash(this.password, 10);
  // }
}
