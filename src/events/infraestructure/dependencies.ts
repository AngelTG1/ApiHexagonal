import { MysqlEventRepository } from "./mysqlEventRepository";

import { AddEventUseCase } from "../aplication/addEventUseCase";
import { AddEventController } from "./controller/addEventController";

import { UpdateEventUseCase } from "../aplication/updateEventUseCase";
import { UpdateEventController } from "./controller/updateEventController";

import { GetEventUseCase } from "../aplication/getEventUseCase";
import { GetEventController } from "./controller/getEventController";

export const mysqlEventRepository = new MysqlEventRepository();

export const addEventUseCase = new AddEventUseCase(mysqlEventRepository);

export const addEventController = new AddEventController(addEventUseCase);

export const updateEventUseCase = new UpdateEventUseCase(mysqlEventRepository);

export const updateEventController = new UpdateEventController(updateEventUseCase);

export const getEventUseCase = new GetEventUseCase(mysqlEventRepository);

export const getEventController = new GetEventController(getEventUseCase);