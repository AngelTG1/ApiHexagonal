import { Event } from "./event";

export interface EventRepository{
    addEvent(name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null>;
    updateEvent(id: number, name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null>;
    getEvent(): Promise<Event[] | null>;
}

