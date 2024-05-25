import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class AddEventUseCase {
    constructor(private repository: EventRepository) {}

    async run(name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null>{
        return await this.repository.addEvent(name, description, date, hour, location, userId);
    }
}