import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";
import { query } from "../../database/db";

export class MysqlEventRepository implements EventRepository{
    async updateEvent(id: number, name: string, description: string, date: Date, hour: string, location: string, userId: number): Promise<Event | null> {
        let event = null;
        const sql = "UPDATE events SET name = ?, description = ?, date = ?, hour = ?, location = ?, userId = ? WHERE id = ?";
        const params: any[] = [name, description, date, hour, location, userId, id];
        try {
            const [result]: any = await query(sql, params);
            event = new Event(result.id, result.name, result.description, result.date, result.hour, result.location, result.userId);
        } catch (error) {
            event = null;
        } finally {
            return event;
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

    async getEvent(): Promise<Event[] | null> {
        const sql = "SELECT * FROM events";
        try {
          const [data]: any = await query(sql, []);
          const dataEvents = Object.values(JSON.parse(JSON.stringify(data)));
    
          return dataEvents.map(
            (event: any) => new Event(event.id, event.name, event.description, event.date, event.hour, event.location, event.userId)
          );
        } catch (error) {
          return null;
        }
      }

   
}