import { MysqlEventRepository } from "./mysqlEventRepository";

import { AddEventUseCase } from "../aplication/addEventUseCase";
import { AddEventController } from "./controller/addEventController";

export const mysqlEventRepository = new MysqlEventRepository();

export const addEventUseCase = new AddEventUseCase(mysqlEventRepository);

export const addEventController = new AddEventController(addEventUseCase);