import { MysqlUserRepository } from "./mysqlUserRepository";

import { AddUserUseCase } from "../aplication/addUserUseCase";
import { AdduserController } from "./controller/addUserController";

import { GetUserUseCase } from "../aplication/getUserUseCase";
import { GetUserController } from "./controller/getUserController";

export const mysqlUserRepository = new MysqlUserRepository();

export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);

export const addUserController = new AdduserController(addUserUseCase);


export const getUserUseCase = new GetUserUseCase(mysqlUserRepository);

export const getUserController = new GetUserController(getUserUseCase);