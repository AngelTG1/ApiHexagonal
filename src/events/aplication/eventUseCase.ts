import { Event } from "../domain/event";
import { EventRepository } from "../domain/eventRepository";
import { RabbitMQ } from "../infraestructure/RabbitMQ";
import { IEmailService } from "./Services/IEmailService";

export class EventUseCase {
  private rabbitMQ: RabbitMQ;

  constructor(
    private eventRepository: EventRepository,
    private emailService: IEmailService
  ) {
    this.rabbitMQ = new RabbitMQ();
    this.rabbitMQ.connect();
  }

  async getEventStatus(name: string): Promise<Event | undefined> {
    return this.eventRepository.getEvent(name);
  }

  async toggleEventStatus(name: string): Promise<Event | undefined> {
    const event = await this.eventRepository.getEvent(name);
    if (event) {
      event.status = event.status === 1 ? 0 : 1;
      await this.eventRepository.saveEvent(event);
      await this.rabbitMQ.sendMessage("device-status-changed", {
        name: event.name,
        status: event.status,
      });
      console.log(
        `Message sent to RabbitMQ: { name: ${event.name}, status: ${event.status} }`
      );

      // Send email notification
      const subject = `Event Status Changed: ${event.name}`;
      const message = `The status of the event ${event.name} has been changed to ${event.status}.`;
      await this.emailService.sendEventNotification("angeltgz30@gmail.com", subject, message);
    }
    return event;
  }

  async getAllEventsStatus(): Promise<Event[]> {
    const events = await this.eventRepository.getAllEvents();
    return Object.values(events);
  }
}
