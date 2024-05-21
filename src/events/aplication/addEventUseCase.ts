import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class AddEventUseCase{
    constructor( readonly eventRepository: EventRepository){}
    async run ( name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null>{
        try{
            const createEvent = await this.eventRepository.addEvent(name, description, date, hour, location, userId);
            return createEvent;
        } catch(error){
            console.error('Error in AddEventUseCase', error);
            return null
        }
        
    }
}