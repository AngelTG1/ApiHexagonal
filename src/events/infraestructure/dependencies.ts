import { MysqlEventRepository } from "./mysqlEventRepository";
import { EventUseCase } from "../aplication/eventUseCase";
import { EventController } from "./controller/eventController";

export const mysqlEventRepository = new MysqlEventRepository()

export const eventUseCase = new EventUseCase(mysqlEventRepository);

export const eventController = new EventController(eventUseCase);