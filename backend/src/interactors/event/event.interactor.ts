import ApiError from "../../utils/helper/ApiError";
import { Event } from "../../entities";
import { IEventInteractor, IEventRepository } from "../../interfaces";

export class EventInteractor implements IEventInteractor {

    private repository: IEventRepository

    constructor(
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

    async getAllEvent(limit: number, offset: number, search?: string, startDate?: Date, endDate?: Date): Promise<Event[]> {
        
        return await this.repository.findAll(limit, offset, search, startDate, endDate);
        
    }

    async getByIdEvent(id: number): Promise<Event> {

        const result = await this.repository.findById(id)
        
        if (!result) {

            throw new ApiError(400, "Event not found")
            
        }

        return result
    }
}