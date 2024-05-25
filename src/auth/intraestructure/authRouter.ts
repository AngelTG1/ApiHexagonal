import express from "express";

import { authController } from "./dependencies";

export const authRouter = express.Router();

authRouter.post(
    "/login", authController.login.bind(authController)
);

authRouter.post(
    "/register", authController.register.bind(authController)
);