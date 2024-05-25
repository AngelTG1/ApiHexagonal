import { Request, Response } from 'express';
import { GetEventUseCase } from '../../aplication/getEventUseCase';

export class GetEventController {
    constructor(readonly getEventUseCase: GetEventUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const events = await this.getEventUseCase.run();
            console.log(events);
            if (events)
                res.status(200).send({
                    status: 'success',
                    data: events.map((event: any) => {
                        return {
                            id: event.id,
                            name: event.name,
                            description: event.description,
                            date: event.date,
                            location: event.location,
                        };
                    }),
                });
            else
                res.status(400).send({
                    status: 'error',
                    msn: 'Ocurrio algún problema',
                });
        } catch (error) {
            res.status(404).send({
                status: 'error',
                data: 'Ocurrio un error',
                msn: error,
            });
        }
    }
}