import { MysqlUserRepository } from "./mysqlUserRepository";

import { AddUserUseCase } from "../aplication/addUserUseCase";
import { AdduserController } from "./controller/addUserController";

import { GetUserUseCase } from "../aplication/getUserUseCase";
import { GetUserController } from "./controller/getUserController";

import { UpdateUserUseCase } from "../aplication/updateUserCase";
import { UpdateUserController } from "./controller/updateUserController";

import { DeleteUserUseCase } from "../aplication/deleteUserCase";
import { DeleteUserController } from "./controller/deleteUserController";

export const mysqlUserRepository = new MysqlUserRepository();

export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);

export const addUserController = new AdduserController(addUserUseCase);


export const getUserUseCase = new GetUserUseCase(mysqlUserRepository);

export const getUserController = new GetUserController(getUserUseCase);

export const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepository);

export const updateUserController = new UpdateUserController(updateUserUseCase);

export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);

export const deleteUserController = new DeleteUserController(deleteUserUseCase);