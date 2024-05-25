import { Request, Response } from "express"; 
import { UpdateEventUseCase } from "../../aplication/updateEventUseCase";

export class UpdateEventController {
    constructor(readonly updateEventUseCase: UpdateEventUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { id, name, description, date, hour, location, userId } = req.body;

            let updatedEvent = await this.updateEventUseCase.run(id, name, description, date, hour, location, userId);

            if (updatedEvent) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: updatedEvent.id,
                        name: updatedEvent.name,
                        description: updatedEvent.description,
                        date: updatedEvent.date,
                        hour: updatedEvent.hour,
                        location: updatedEvent.location,
                        userId: updatedEvent.userId,
                    },
                    message: "Evento Actualizado",
                });
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Al Actualizar Evento",
                });
            }
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(404).send({
                status: "error",
                Message: "Error In Server",
            });
        }
    }
}