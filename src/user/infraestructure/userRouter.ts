import express from "express"

import { addUserController } from "./dependencies";
import { getUserController } from "./dependencies";



export const userRouter = express.Router();

userRouter.post(
    "/create",addUserController.run.bind(addUserController)
);

userRouter.get(
    "/all", getUserController.run.bind(getUserController)
);