import { MysqlProdcutRepository } from "./mysqlProdcutRepository";

import { AddProductUseCase } from "../application/addProductUseCase";
import { AddProductController } from "./controller/addProductController";

export const mysqlProdcutRepository = new MysqlProdcutRepository();

export const addProductUseCase = new AddProductUseCase(mysqlProdcutRepository);

export const addProductController = new AddProductController(addProductUseCase);