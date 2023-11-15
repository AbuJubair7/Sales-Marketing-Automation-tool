import { ContactService } from "./contact.service";
import { ContactDto } from './dto/contact.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('contact')
export class ContactController{
    constructor(private readonly service: ContactService){}

    @Post('create')
    create(@Body() data: ContactDto){
        return this.service.createContact(data);
    }

    @Get('find')
    find(@Body() data) {
        return this.service.findContact(data);
    }

    @Get('findall')
    findAll() {
        return this.service.findAll();
    }

    @Put('update/:data')
    update(@Param('data') id: number, @Body() data: ContactDto) {
        this.service.updateContact(id, data);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.service.deleteContact(id);
    }

    @Get('export')
    async exportToCsv() {
        await this.service.exportToCsv();
    }
}