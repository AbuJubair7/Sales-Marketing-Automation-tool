import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  private contact = [];

  addContact(data: ContactDto) {
    this.contact.push(data);
  }
  getAllContact() {
    return this.contact;
  }

  findContact(id: string) {
    const data = this.contact.find((contact) => {
      return contact.id === id;
    });
    console.log(data);
    if (!data) throw new NotFoundException('Data not available');
    return data;
  }
}