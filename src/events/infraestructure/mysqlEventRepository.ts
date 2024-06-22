import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";
import { query } from "../../database/db";

export class MysqlEventRepository implements EventRepository {
  async getEvent(name: string): Promise<Event | undefined> {
    const sql = "SELECT * FROM event WHERE name = ?";
    const [rows]: any = await query(sql, [name]);
    const eventRow = rows[0];
    if (eventRow) {
      return new Event(eventRow.name, eventRow.status);
    }
    return undefined;
  }

  async saveEvent(event: Event): Promise<void> {
    const sql = "REPLACE INTO event (name, status) VALUES (?, ?)";
    await query(sql, [event.name, event.status]);
  }

  async getAllEvents(): Promise<{ [name: string]: Event }> {
    const sql = 'SELECT * FROM event';
    const [rows]: any = await query(sql, []);
    const events: { [name: string]: Event } = {};
    rows.forEach((row: any) => {
      events[row.name] = new Event(row.name, row.status);
    });
    return events;
  }
}
