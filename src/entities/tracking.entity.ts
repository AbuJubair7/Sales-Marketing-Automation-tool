import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Contact } from "./contact.entity";

@Entity('tracking')
export class Tracking{
    @PrimaryGeneratedColumn()
    trackid: number;

    @Column({ nullable: false })
    link: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
    click_timestamp: Date;

    @ManyToOne(() => Contact, contact => contact.tracking)
    contact: Contact;  

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}

