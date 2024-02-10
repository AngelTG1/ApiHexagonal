import { MysqlUserRepository } from "./mysqlUserRepository";
import { AddUserUseCase } from "../aplication/addUserUseCase";
import { AdduserController } from "./controller/addUserController";
import { GetUserUseCase } from "../aplication/getUserUseCase";
import { GetUserController } from "./controller/getUserController";
import { BcryptHashService } from "../services/bcryptHashService"; 

// Crear instancias de servicios y repositorios
const hashService = new BcryptHashService();
const mysqlUserRepository = new MysqlUserRepository(hashService);

// Crear instancias de casos de uso y controladorers
const addUserUseCase = new AddUserUseCase(mysqlUserRepository);
const addUserController = new AdduserController(addUserUseCase);

const getUserUseCase = new GetUserUseCase(mysqlUserRepository);
const getUserController = new GetUserController(getUserUseCase);


export {
  hashService,
  mysqlUserRepository,
  addUserUseCase,
  addUserController,
  getUserUseCase,
  getUserController,
};
