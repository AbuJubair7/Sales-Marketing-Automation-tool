import { Body, Controller, Get, Param, ValidationPipe } from "@nestjs/common";
import { ContactDto } from "src/contact/dto/contact.dto";
import { TrackingDto } from "./dto/tracking.dto";
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController{
    constructor(private readonly service: TrackingService){}

    // @Get('track/:id')
    // async track(@Param('id') id: number) {
    //     await this.service.trackContact(id);
    //     return 'Tracking successful!';
    // }

    @Get('track')
    async track(@Body() data) {
        await this.service.trackContact(data);
        return 'Tracking successful!';
    }
}