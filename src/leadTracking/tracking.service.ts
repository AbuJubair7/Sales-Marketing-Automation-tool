import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tracking } from "src/entities/tracking.entity";
import { Contact } from "src/entities/contact.entity";


@Injectable()
export class TrackingService{
    constructor(
        @InjectRepository(Tracking)
        private readonly trackingRepo: Repository<Tracking>,

        @InjectRepository(Contact)
        private readonly contactRepo: Repository<Contact>,
    ) {}

    async trackContact(data) {
      let contact = await this.contactRepo.findOne({ where: [{ email: data.val }] });
      if (!contact) {
        const anonymousTracking = this.trackingRepo.create({
          email: "anonymous@gmail.com",
          timestamp: new Date(),
        });
        await this.trackingRepo.save(anonymousTracking);
        //await this.trackingRepo.save({ NotFound: null, timestamp: new Date() });
        throw new NotFoundException('This contact is not recorded');
      }
      await this.trackingRepo.save({ contact, timestamp: new Date() });
    }
}
