import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class EventUseCase {
    constructor(private eventRepository: EventRepository){}

    async getEventStatus(name: string): Promise<Event | undefined> {
        return this.eventRepository.getEvent(name);
    }

    async toggleEventStatus(name: string): Promise<Event | undefined> {
        const event = await this.eventRepository.getEvent(name);
        if(event) {
            event.toggle();
            await this.eventRepository.saveEvent(event);
        }
        return event;
    }

    async getAllEventsStatus(): Promise<Event[]>{
        const events = await this.eventRepository.getAllEvents();
        return Object.values(events);
    }
}