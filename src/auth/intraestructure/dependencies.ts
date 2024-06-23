// src/auth/infrastructure/dependencies.ts
import { MysqlAuthRepository } from "./MysqlAuthRepository";
import { AuthUseCase } from "../aplication/AuthUseCase";
import { AuthController } from "./controller/AuthControlle";
import { EncryptService } from "./helpers/EncryptService";
import { JwtService } from "./helpers/JwtService"; 

const mysqlAuthRepository = new MysqlAuthRepository();
const encryptPassword = new EncryptService();
const jwtService = new JwtService(); 

const authUseCase = new AuthUseCase(mysqlAuthRepository, encryptPassword, jwtService);

const authController = new AuthController(authUseCase);

export { authController, authUseCase, mysqlAuthRepository, encryptPassword };
