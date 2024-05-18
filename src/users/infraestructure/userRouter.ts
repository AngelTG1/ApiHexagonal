import express from "express"

import { addUserController } from "./dependencies";



export const userRouter = express.Router();

userRouter.post(
    "/",addUserController.run.bind(addUserController)
);