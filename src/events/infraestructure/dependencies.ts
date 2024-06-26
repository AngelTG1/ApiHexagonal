import { MysqlEventRepository } from "./mysqlEventRepository";
import { EventUseCase } from "../aplication/eventUseCase";
import { EventController } from "./controller/eventController";
import { EmailService } from "./helpers/EmailService";

const mysqlEventRepository = new MysqlEventRepository();
const emailService: EmailService = new EmailService(); 

const eventUseCase = new EventUseCase(mysqlEventRepository, emailService);

const eventController = new EventController(eventUseCase);

export { eventController, eventUseCase, mysqlEventRepository, emailService };
