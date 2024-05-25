import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";

export class AddEventUseCase{
    getById(id: string) {
        throw new Error("Method not implemented.");
    }
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

    async createEvent(name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null>{
        try{
            const event = new Event(0, name, description, date, hour, location, userId);
            await this.eventRepository.save(event);
            return event;
        } catch(error){
            console.error('Error in AddEventUseCase', error);
            return null;
        }
    }

    async getEventsByUserId(userId: number): Promise<Event | null>{
        try{
            const events = await this.eventRepository.getById(userId);
            return events;
        } catch(error){
            console.error('Error in AddEventUseCase', error);
            return null;
        }
    }   
}