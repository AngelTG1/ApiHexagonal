import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class UpdateEventUseCase {
    constructor(private repository: EventRepository) {}

    async run(id: number, name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null> {
        try {
            return await this.repository.updateEvent(id, name, description, date, hour, location, userId);
        } catch (error) {
            // Handle the error here
            console.error("An error occurred while updating the event:", error);
            return null;
        }
    }
}