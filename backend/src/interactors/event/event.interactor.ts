import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import { inject, injectable } from 'inversify';
import ApiError from "../../utils/helper/ApiError";
import { Event } from "../../entities";
import { IEventInteractor, IEventRepository } from "../../interfaces";

@injectable()
export class EventInteractor implements IEventInteractor {

    private repository: IEventRepository


    constructor(

        @inject(INTERFACE_TYPE.EventRepository)
        repository: IEventRepository

    ) {

        this.repository = repository

    }


    async createEvent(data: Partial<Event>): Promise<Event> {

        return await this.repository.create(data);

    }


    async updateEvent(id: number, data: Partial<Event>): Promise<Event | boolean> {

        return await this.repository.update(id, data);

    }


    async getAllEvent(

        size: number,
        page: number,
        search?: string,
        startDate?: Date,
        endDate?: Date

    ): Promise<{

        totalItems: number;
        rows: Event[];
        totalPages: number;
        currentPage: number

    }> {

        const currentPage = Math.max(page, 1);

        const limit = size || 10;

        const offset = (currentPage - 1) * limit;

        const [rows, count] = await this.repository.findAll(limit, offset, search, startDate, endDate);

        const totalPages = count > 0 ? Math.ceil(count / limit) : 1;

        return { totalItems: count, rows, totalPages, currentPage };
    }


    async getByIdEvent(id: number): Promise<Event> {

        const result = await this.repository.findById(id)

        if (!result) {

            throw new ApiError(400, "Event not found")

        }

        return result
    }

    async deleteEvent(id: number): Promise<Event> {

        const result = await this.repository.findById(id)

        if (!result) {

            throw new ApiError(400, "Event not found")

        }

        await this.repository.delete(id)

        return result
    }


}