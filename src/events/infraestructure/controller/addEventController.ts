import { Request, Response } from "express";
import { AddEventUseCase } from "../../aplication/addEventUseCase";

export class AddEventController {
    constructor(readonly addEventUseCase: AddEventUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { name, description, date, hour, location, userId } = req.body;

            let createdEvent = await this.addEventUseCase.run( name, description, date, hour, location, userId);    

            if (createdEvent) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        name: createdEvent.name,
                        description: createdEvent.description,
                        date: createdEvent.date,
                        hour: createdEvent.hour,
                        location: createdEvent.location,
                        userId: createdEvent.userId
                    },
                    message: "Event Created"
                });
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Creating Event"
                });
            }
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(500).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }

    async save(req: Request, res: Response) {
        try {
            let { name, description, date, hour, location, userId } = req.body;

            let createdEvent = await this.addEventUseCase.createEvent(name, description, date, hour, location, userId);

            if (createdEvent) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        name: createdEvent.name,
                        description: createdEvent.description,
                        date: createdEvent.date,
                        hour: createdEvent.hour,
                        location: createdEvent.location,
                        userId: createdEvent.userId
                    },
                    message: "Event Created"
                });
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Creating Event"
                });
            }
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(500).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }

    
    async getEventsByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const events = await this.addEventUseCase.getEventsByUserId(Number(userId));

            return res.status(200).send({
                status: "success",
                data: events,
                message: "Events retrieved"
            });
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(500).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }
}