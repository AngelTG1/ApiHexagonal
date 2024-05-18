import { MysqlUserRepository } from "./mysqlUserRepository";

import { AddUserUseCase } from "../aplication/addUserUseCase";
import { AdduserController } from "./controller/addUserController";

export const mysqlUserRepository = new MysqlUserRepository();

export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);

export const addUserController = new AdduserController(addUserUseCase);