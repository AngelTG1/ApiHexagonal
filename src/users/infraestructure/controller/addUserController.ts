import {Request, Response} from "express";
import { AddUserUseCase } from "../../aplication/addUserUseCase";

export class AdduserController{
    constructor(readonly addUserUsecase: AddUserUseCase){}

    async run (req: Request, res: Response){
        try{
            let {name, email}= req.body; 

            let createduser = await this.addUserUsecase.run(name, email);

            if (createduser) {
                return res.status(201).send({
                    status: "success",
                    data:{
                        id: createduser.id,
                        name: createduser.name,
                        email: createduser.email
                    },
                    message: "User Creado"
                })
                
            }else{
                return res.status(400).send({
                    status: "Error",
                    data:[],
                    Message:"Error Al Crear User"
                });
            }
        }catch(error){
            console.error("Error In Controller", error);
            res.status(404).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }
}

