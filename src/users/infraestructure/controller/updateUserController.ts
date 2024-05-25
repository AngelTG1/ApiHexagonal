import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../aplication/updateUserCase";

export class UpdateUserController {
    constructor(readonly updateUserUseCase: UpdateUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { id, name, email, password } = req.body;

            let updatedUser = await this.updateUserUseCase.run(id, name, email, password);

            if (updatedUser) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: updatedUser.id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        password: updatedUser.password,
                    },
                    message: "User Actualizado",
                });
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Al Actualizar User",
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