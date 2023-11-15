import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Tracking } from "src/entities/tracking.entity";
import { TrackingController } from "./tracking.controller";
import { TrackingService } from "./tracking.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tracking,Contact])], 
    controllers: [TrackingController],
    providers: [TrackingService],
})

export class TrackingModule{}