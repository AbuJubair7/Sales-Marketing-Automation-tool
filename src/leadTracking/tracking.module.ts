import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { Tracking } from "src/entities/tracking.entity";
import { TrackingController } from "./tracking.controller";
import { TrackingService } from "./tracking.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tracking]), TypeOrmModule.forRoot(ormConfig)], 
    controllers: [TrackingController],
    providers: [TrackingService],
})

export class TrackingModule{}