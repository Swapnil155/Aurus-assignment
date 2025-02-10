import { inject, injectable } from 'inversify';
import { AsyncHandler, INTERFACE_TYPE } from "../../utils";
import { IEventInteractor } from "../../interfaces";
import ApiResponse from "../../utils/helper/ApiResponse";
import { Request, Response } from "express";

@injectable()
export class EventController {

    private interactor: IEventInteractor

    constructor(

        @inject(INTERFACE_TYPE.EventInteractor)
        interactor: IEventInteractor

    ) {

        this.interactor = interactor

    }

    @AsyncHandler()
    async onCreateEvent(req: Request, res: Response) {

        if (req.files && !Array.isArray(req.files)) {

            req.body.eventArtifacts = req.files['eventArtifacts'][0].path

            req.body.eventAttendee = req.files['eventAttendee'][0].path

        }

        await this.interactor.createEvent(req.body);

        res.status(201).json(new ApiResponse(201, {}, 'Successfully created'));

    }

    @AsyncHandler()
    async onGetAllEvent(req: Request, res: Response) {

        const { size = 10, page = 1, search } = req.query

        const data = await this.interactor.getAllEvent(+size, +page, typeof search === 'string' ? search : undefined)

        res.status(200).json(new ApiResponse(200, data, "Successfully retrieved"))

    }

    @AsyncHandler()
    async onGetByIdEvent(req: Request, res: Response) {

        const data = await this.interactor.getByIdEvent(Number(req.params.id))

        res.status(200).json(new ApiResponse(200, data, "Successfully Retrieved"))

    }

    @AsyncHandler()
    async onUpdateEvent(req: Request, res: Response) {

        await this.interactor.updateEvent(Number(req.params.id), req.body)

        res.status(200).json(new ApiResponse(200, {}, "Successfully updated"))

    }

} 