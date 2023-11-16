import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { ContactDto } from './dto/contact.dto';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async createContact(data: ContactDto) {
    const contact = await this.contactRepo.create(data);
    return await this.contactRepo.save(contact);
  }

  async findContact(data) {
    const contact = await this.contactRepo.findOne({
      where: [{ name: data.val }, { email: data.val }],
    });
    if (contact) return contact;
    else throw new NotFoundException('No data found');
  }

  async findAll() {
    return this.contactRepo.find();
  }

  async updateContact(id: number, data: ContactDto) {
    return this.contactRepo.update(id, data);
  }

  async deleteContact(data: number) {
    return this.contactRepo.delete(data);
  }

  async exportToCsv() {
    const data = await this.contactRepo.find();
    const csvStream = fastCsv.format({ headers: true });
    const writableStream = fs.createWriteStream(
      '/Users/mahjabinmim/desktop/contacts.csv',
    );
    csvStream.pipe(writableStream);
    data.forEach((item) => {
      csvStream.write(item);
    });
    csvStream.end();
  }
}
