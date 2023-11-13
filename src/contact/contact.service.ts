import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactDto } from './dto/contact.dto';

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

  async updateContact(id: number, data: ContactDto) {
    return this.contactRepo.update(id, data);
  }

  async deleteContact(data: number) {
    return this.contactRepo.delete(data);
  }
}
