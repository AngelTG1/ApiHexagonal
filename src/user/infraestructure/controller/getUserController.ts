import { Response, Request } from "express";

import { GetUserUseCase } from "../../aplication/getUserUseCase";

export class GetUserController {
    constructor(readonly getUserUseCase: GetUserUseCase) {}

    async run (req: Request, res: Response){
        try {
            const users = await this.getUserUseCase.run();
            console.log(users);
            if(users)
                //Code HTTP : 200 -> Consulta exitosa
                res.status(200).send({
                    status: "success",
                    data: users.map((user: any) => {
                        return {
                            id: user.id,
                            name: user.name,
                            last_name: user.last_name,
                            email: user.email,
                            password: user.password
                        }
                    })
                })

            else
                res.status(400).send({
                    status: "error",
                    msn: "Ocurrio algún problema",
                });       
        } catch (error) {
            res.status(204).send({
                status: "error",
                data: "Ocurrio un error",
                msn: error,
            });
        }
    }
}