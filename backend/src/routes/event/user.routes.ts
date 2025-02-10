import { EventSchema, EventUpdateSchema, IdSchema, SearchSchema } from './../../validation';
import { Uploader } from './../../middleware/uploader';
import { EventController } from './../../controllers';
import { EventInteractor } from './../../interactors';
import { EventRepository } from './../../repositories';
import { IEventInteractor, IEventRepository } from './../../interfaces';
import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import validate from '../../middleware/validate';
import { Container } from 'inversify';
import express from 'express';

const container = new Container();
const upload = Uploader('Event')


container.bind<IEventRepository>(INTERFACE_TYPE.EventRepository).to(EventRepository)

container.bind<IEventInteractor>(INTERFACE_TYPE.EventInteractor).to(EventInteractor)

container.bind<EventController>(INTERFACE_TYPE.EventController).to(EventController)


const userRoutes = express.Router();

const eventController = container.get<EventController>(INTERFACE_TYPE.EventController)

userRoutes.route('/')
    .get(
        validate(SearchSchema),
        eventController.onGetAllEvent.bind(eventController))
    .post(
        upload.fields([{ name: 'eventArtifacts', maxCount: 1 }, { name: 'eventAttendee', maxCount: 1 }]),
        validate(EventSchema),
        eventController.onCreateEvent.bind(eventController)
    )

userRoutes.route('/:id')
    .all(validate(IdSchema))
    .get(eventController.onGetByIdEvent.bind(eventController))
    .patch(
        upload.fields([{ name: 'eventArtifacts', maxCount: 1 }, { name: 'eventAttendee', maxCount: 1 }]),
        validate(EventUpdateSchema),
        eventController.onUpdateEvent.bind(eventController)
    ).delete(eventController.onDeleteEvent.bind(eventController))


export default userRoutes;