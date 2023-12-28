import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  //@UseGuards(JwtGuard)
  @Post('create/ContactDto')
  async create(@Body() data: ContactDto) {
    await this.service.createContact(data);
    return 'Created successfully!';
  }

  //@UseGuards(JwtGuard)
  @Get('find')
  find(@Body() data) {
    return this.service.findContact(data);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: any) {
    return this.service.findOne(id);
  }

  //@UseGuards(JwtGuard)
  @Get('filtering')
  contactFiltering(@Body() data:any) {
      return this.service.contactFiltering(data);
  }

  //@UseGuards(JwtGuard)
  @Get('findall')
  findAll() {
    return this.service.findAll();
  }

  //@UseGuards(JwtGuard)
  @Put('update/:data')
  async update(@Param('data') id: number, @Body() data: ContactDto) {
    await this.service.updateContact(id, data);
    return await 'Updated successfully!';
  }

  //@UseGuards(JwtGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    await this.service.deleteContact(id);
    return await 'Deleted successfully!';
  }

  //@UseGuards(JwtGuard)
  @Get('export')
  async exportToCsv() {
    await this.service.exportToCsv();
    return await 'Exported successfully!';
  }
}
