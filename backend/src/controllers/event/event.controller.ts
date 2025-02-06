import { AsyncHandler } from "../../utils";
import { IEventInteractor } from "../../interfaces";
import ApiResponse from "../../utils/helper/ApiResponse";
import { Request, Response } from "express";

export class EventController {
    private interactor: IEventInteractor

    constructor(

        interactor: IEventInteractor

    ) {

        this.interactor = interactor
        
    }

    @AsyncHandler()
    async onCreateEvent(req: Request, res: Response) {

        await this.interactor.createEvent(req.body);

        res.status(201).json(new ApiResponse(201, {}, 'Successfully created'));

    }

    @AsyncHandler()
    async onGetAllEvent(req: Request, res: Response) {

        const { size, page } = req.params

        const data = await this.interactor.getAllEvent(Number(size), Number(page))

        res.status(200).json(new ApiResponse(200, data, "Successfully retrieved"))

    }

} 