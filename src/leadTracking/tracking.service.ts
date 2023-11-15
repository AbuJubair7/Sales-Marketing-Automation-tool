import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tracking } from "src/entities/tracking.entity";
import { Contact } from "src/entities/contact.entity";


@Injectable()
export class TrackingService{
    constructor(
        @InjectRepository(Tracking)
        private readonly trackingRepo: Repository<Tracking>,
        private readonly contactRepo: Repository<Contact>,
    ) {}

    async trackLinkClick(id: number, link: string) {
        const contact = await this.contactRepo.findOne({ where: { id: id } });
        if (contact) {
            const linkClick = new Tracking();
            linkClick.link = link;
            linkClick.contact = contact;
            await this.trackingRepo.save(linkClick);
        }
    }
}