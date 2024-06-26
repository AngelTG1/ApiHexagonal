import { MysqlAuthRepository } from "./MysqlAuthRepository";
import { AuthUseCase } from "../aplication/AuthUseCase";
import { AuthController } from "./controller/AuthControlle"; 
import { EncryptService } from "./helpers/EncryptService";
import { JwtService } from "./helpers/JwtService";
import { EmailService } from "./helpers/EmailService"; 

const mysqlAuthRepository = new MysqlAuthRepository();
const encryptPassword = new EncryptService();
const jwtService = new JwtService();
const emailService = new EmailService(); 

const authUseCase = new AuthUseCase(mysqlAuthRepository, encryptPassword, jwtService, emailService);
const authController = new AuthController(authUseCase);

export { authController, authUseCase, mysqlAuthRepository, encryptPassword, jwtService, emailService };
