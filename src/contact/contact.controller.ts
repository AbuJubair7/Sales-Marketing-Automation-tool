import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ContactService } from './contact.service';
  import { ContactDto } from './contact.dto';
  // get, put, post, delete
  @Controller('contact')
  export class ContactController {
    constructor(private readonly service: ContactService) {}
  
    @Post()
    @UsePipes(new ValidationPipe())
    addContact(@Body() data: ContactDto) {
      this.service.addContact(data);
    }
  
    @Get(':id')
    @UsePipes(new ValidationPipe())
    getContact(@Param('id') id: string) {
      return this.service.findContact(id);
    }
  
    @Get()
    getAllContact() {
      return this.service.getAllContact();
    }
  }