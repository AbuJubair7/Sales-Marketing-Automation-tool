import { Controller, Get, Param } from "@nestjs/common";

@Controller('tracking')
export class TrackingController{
    constructor(private readonly service: TrackingController){}

    @Get(':id/:link')
    async trackLinkClick(
        @Param('id') id: number,
        @Param('link') link: string,
    ) {
        const decLink = decodeURIComponent(link);
        await this.service.trackLinkClick(id, decLink);
        return 'Link click tracked successfully';
    }
}