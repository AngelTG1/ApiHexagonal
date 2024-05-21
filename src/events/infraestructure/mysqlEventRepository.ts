import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";
import { query } from "../../database/db";

export class MysqlEventRepository implements EventRepository{

    async addEvent(name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null> {
        let event = null;
        const sql = "INSERT INTO events (name, description, date, hour, location, userId) VALUES (?, ?, ?, ?, ?, ?)";
        const params: any[] = [name, description, date, hour, location, userId];
        try {
            const [result]: any = await query(sql, params);

            event = new Event(result.id, result.name, result.description, result.date, result.hour, result.location, result.userId);
        } catch (error) {
            event = null;
        } finally {
            return event;
        }
    }
}