import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../aplication/deleteUserCase";

export class DeleteUserController {
    constructor(readonly deleteUserUseCase: DeleteUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { id } = req.body;

            let deletedUser = await this.deleteUserUseCase.run(id);

            if (deletedUser && typeof deletedUser !== 'boolean') {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: id,
                    },
                    message: "User Eliminado",
                });
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Al Eliminar User",
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