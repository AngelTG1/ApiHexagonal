import { Request, Response } from "express";
import { AddProductUseCase } from "../../application/addProductUseCase";

export class AddProductController{
    constructor(readonly addUserUsecase: AddProductUseCase){}

    async run (req: Request, res: Response){
        try{
            let {name, description, price}= req.body; // cambia

            let createdproduct = await this.addUserUsecase.run(name, description, price);

            if (createdproduct) {
                return res.status(200).send({
                    status: "success",
                    data:{
                        name: createdproduct.name,
                        description: createdproduct.description,
                        price: createdproduct.price,
             
                    },
                    message: "Product Creado"
                })
                
            }else{
                return res.status(400).send({
                    status: "Error",
                    data:[],
                    Message:"Error Al Crear Product"
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