import express from "express"

import { addEventController } from "./dependencies"

export const eventRouter = express.Router();

eventRouter.post(
    "/",addEventController.run.bind(addEventController)
);

eventRouter.get(
    "/:categoria/:fecha/:ubucacion",addEventController.run.bind(addEventController)
);  



// localhost:3000/events/1/2021-10-10/suchiapa