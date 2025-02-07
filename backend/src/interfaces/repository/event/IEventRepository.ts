import { Event } from '../../../entities';

export interface IEventRepository {
    create(data: Partial<Event>): Promise<Event>;
    update(id: number, data: Partial<Event>): Promise<Event>;
    findAll(
        limit: number,
        offset: number,
        search?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<[Event[], number]>;
    findById(id: number): Promise<Event | null>;
}