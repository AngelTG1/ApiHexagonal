import express from 'express'

import { eventController } from './dependencies'

export const eventRouter = express.Router();

eventRouter.get('/status', eventController.getAllEventsStatus.bind(eventController))
eventRouter.post('/event/:event', eventController.toggleEventStatus.bind(eventController))

