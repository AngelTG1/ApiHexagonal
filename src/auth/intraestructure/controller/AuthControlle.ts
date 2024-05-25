import { Request, Response } from "express";
import { AuthUseCase } from "../../aplication/AuthUseCase";

export class AuthController {
    constructor(readonly authUseCase: AuthUseCase) { }

    async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;

            let token = await this.authUseCase.login(email, password);

            if (token) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        token: token
                    },
                    message: "User Logeado"
                })
            } else {
                return res.status(400).send({
                    status: "Error",
                    data: [],
                    Message: "Error Al Logear User"
                });
            }
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(404).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            let { name, email, password } = req.body;

            await this.authUseCase.register(name, email, password);

            return res.status(200).send({
                status: "success",
                data: [],
                message: "User Registrado"
            })
        } catch (error) {
            console.error("Error In Controller", error);
            res.status(404).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }
}