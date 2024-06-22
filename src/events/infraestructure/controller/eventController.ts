import { Request, Response } from "express";
import { EventUseCase } from "../../aplication/eventUseCase";

export class EventController {
  constructor(private eventUseCase: EventUseCase) {}

  async getAllEventsStatus(req: Request, res: Response) {
    try {
      const events = await this.eventUseCase.getAllEventsStatus();
      res.json(
        events.reduce((acc, event) => {
          acc[event.name] = event.status;
          return acc;
        }, {} as { [name: string]: number })
      );
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el estado de los dispositivos" });
    }
  }

  async toggleEventStatus(req: Request, res: Response) {
    const eventName = req.params.event;
    try {
      const event = await this.eventUseCase.toggleEventStatus(eventName);
      if (event) {
        res.json({ device: event.name, status: event.status });
      } else {
        res.status(400).json({ error: 'Dispositivo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al cambiar el estado del dispositivo' });
    }
  }

}
