import { Event } from "./event";

export interface EventRepository{
    getEvent(name: string): Promise<Event| undefined>;
    saveEvent(device: Event): Promise<void>;
    getAllEvents(): Promise<{ [name: string]: Event }>;
}