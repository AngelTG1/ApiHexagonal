import express from "express"

import { addUserController } from "./dependencies";
import { getUserController } from "./dependencies";



export const userRouter = express.Router();

userRouter.post(
    "/",addUserController.run.bind(addUserController)
);

userRouter.get(
    "/", getUserController.run.bind(getUserController)
);