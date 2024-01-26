import {Request, Response} from "express";
import { AddUserUseCase } from "../../aplication/addUserUseCase";

export class AdduserController{
    constructor(readonly addUserUsecase: AddUserUseCase){}

    async run (req: Request, res: Response){
        try{
            let {name, last_name}= req.body; // cambia

            let createduser = await this.addUserUsecase.run(name, last_name);

            if (createduser) {
                return res.status(200).send({
                    status: "success",
                    data:{
                        name: createduser.name,
                        last_name: createduser.last_name
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
            res.status(500).send({
                status: "error",
                Message: "Error In Server"
            });
        }
    }
}