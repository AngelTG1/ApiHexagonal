import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class GetEventUseCase {
    constructor(private repository: EventRepository) {}

    async run(): Promise<Event[] | null> {
        try {
            return await this.repository.getEvent();
        } catch (error) {
            // Handle the error here
            console.error("An error occurred while getting the events:", error);
            return null;
        }
    }
}