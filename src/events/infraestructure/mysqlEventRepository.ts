import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";
import { query } from "../../database/db";

export class MysqlEventRepository implements EventRepository{
    getEventsByUserId(userId: number): Promise<Event[] | null> {
        throw new Error("Method not implemented.");
    }
    async save(event: Event): Promise<void> {
        const sql = "INSERT INTO events (id, name, description, date, hour, location, userId) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const params: any[] = [event.id, event.name, event.description, event.date, event.hour, event.location, event.userId];
        try {
            await query(sql, params);
        } catch (error) {
            console.error("Error in save:", error);
        }
    }

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

    async getById(id: number): Promise<Event | null> {
        let event = null;
        const sql = "SELECT * FROM events WHERE id = ?";
        const params: any[] = [id];
        try {
            const [data]: any = await query(sql, params);
            if (data.length === 0) {
                return null;
            }
            const result = data[0];
            event = new Event(result.id, result.name, result.description, result.date, result.hour, result.location, result.userId);
        } catch (error) {
            event = null;
        } finally {
            return event;
        }
    }
}