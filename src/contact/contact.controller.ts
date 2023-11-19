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

  //@Post('create/ContactDto')
  @Post('create/ContactDto')
  async create(@Body() data: ContactDto) {
    await this.service.createContact(data);
    return await 'Created successfully!';
  }

  @Get('find')
  find(@Body() data) {
    return this.service.findContact(data);
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

  @Put('update/:data')
  async update(@Param('data') id: number, @Body() data: ContactDto) {
      await this.service.updateContact(id, data);
      return await 'Updated successfully!';
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
      await this.service.deleteContact(id);
      return await 'Deleted successfully!';
  }

  @Get('export')
  async exportToCsv() {
      await this.service.exportToCsv();
      return await 'Exported successfully!';
  }
}
