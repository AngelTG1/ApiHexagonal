import { MysqlAuthRepository } from "./MysqlAuthRepository";

import { AuthUseCase } from "../aplication/AuthUseCase";
import { AuthController } from "./controller/AuthControlle";


export const mysqlAuthRepository = new MysqlAuthRepository();

export const authUseCase = new AuthUseCase(mysqlAuthRepository);

export const authController = new AuthController(authUseCase);