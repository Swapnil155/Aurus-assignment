import { Event } from "../../../entities";

export interface IEventInteractor {
    createEvent(data: Partial<Event>): Promise<Event>;
    updateEvent(id: number, data: Partial<Event>): Promise<Event | boolean>
    getAllEvent(limit: number, offset: number, search?: string, startDate?: Date, endDate?: Date): Promise<Event[]>;
    getByIdEvent(id: number): Promise<Event>
}