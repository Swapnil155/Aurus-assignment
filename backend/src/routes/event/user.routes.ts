import { EventController } from './../../controllers';
import { EventInteractor } from './../../interactors';
import { EventRepository } from './../../repositories';
import { IEventInteractor, IEventRepository } from './../../interfaces';
import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import { Container } from 'inversify';
import express from 'express';

const container = new Container();


container.bind<IEventRepository>(INTERFACE_TYPE.EventRepository).to(EventRepository)

container.bind<IEventInteractor>(INTERFACE_TYPE.EventInteractor).to(EventInteractor)

container.bind<EventController>(INTERFACE_TYPE.EventController).to(EventController)


const userRoutes = express.Router();

const eventController = container.get<EventController>(INTERFACE_TYPE.EventController)

userRoutes.route('/')
    .get(eventController.onGetAllEvent.bind(eventController))
    .post(eventController.onCreateEvent.bind(eventController))

userRoutes.route('/:id')
    .get(eventController.onGetByIdEvent.bind(eventController))
    .patch(eventController.onUpdateEvent.bind(eventController))


export default userRoutes;