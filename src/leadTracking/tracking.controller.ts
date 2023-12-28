import { Body, Controller, Get } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly service: TrackingService) {}

  @Get('track')
  async track(@Body() data) {
    await this.service.trackContact(data);
    return 'Tracking successful!';
  }
}
