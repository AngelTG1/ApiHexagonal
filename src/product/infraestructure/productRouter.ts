import express from 'express'

import { addProductController } from './dependencies'

export const productRouter = express.Router();

productRouter.post(
    "/", addProductController.run.bind(addProductController)
);