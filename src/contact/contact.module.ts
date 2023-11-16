import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { Contact } from "src/entities/contact.entity";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
