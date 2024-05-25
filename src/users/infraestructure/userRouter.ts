import express from "express"

import { addUserController } from "./dependencies";
import { getUserController } from "./dependencies";
import { updateUserController } from "./dependencies";
import { deleteUserController } from "./dependencies";


export const userRouter = express.Router();

userRouter.post(
    "/",addUserController.run.bind(addUserController)
);

userRouter.get(
    "/", getUserController.run.bind(getUserController)
);

userRouter.put(
    "/", updateUserController.run.bind(updateUserController)
);

userRouter.delete(
    "/", deleteUserController.run.bind(deleteUserController)
);

