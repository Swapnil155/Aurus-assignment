import { injectable } from 'inversify';
import { Between, FindManyOptions, Like, Repository } from 'typeorm';
import { IEventRepository } from './../../interfaces/';
import { Event } from '../../entities';
import { AppDataSource } from '../../config/data-source';
import ApiError from '../../utils/helper/ApiError';

@injectable()
export class EventRepository implements IEventRepository {

    private readonly eventRepository: Repository<Event>


    constructor() {

        this.eventRepository = AppDataSource.getRepository(Event)

    }


    async create(

        data: Partial<Event>

    ): Promise<Event> {

        const event = this.eventRepository.create(data);

        return await this.eventRepository.save(event);
    }


    async update(

        id: number,
        data: Partial<Event>

    ): Promise<Event> {

        const existingPrincipal = await this.eventRepository.findOne({
            where: { id },
        });

        if (!existingPrincipal) {

            throw new ApiError(404, `Principal with ID ${id} not found`);

        }

        await this.eventRepository.update(id, data);

        return this.eventRepository.findOneOrFail({ where: { id } });
    }


    async findAll(

        limit: number,
        offset: number,
        search?: string,
        startDate?: Date,
        endDate?: Date

    ): Promise<[Event[], number]> {

        const queryOptions: FindManyOptions<Event> = {

            take: limit,
            skip: offset,
            order: { id: 'ASC' },

        };

        if (search) {

            queryOptions.where = [

                { eventName: Like(`%${search}%`) },
                { eventVenue: Like(`%${search}%`) },

            ];

        }

        if (startDate && endDate) {

            queryOptions.where = [

                { eventDate: Between(startDate, endDate) },

                ...(Array.isArray(queryOptions.where) ? queryOptions.where : [])
            ];
        }

        return await this.eventRepository.findAndCount(queryOptions);
    }


    async findById(

        id: number

    ): Promise<Event | null> {

        return await this.eventRepository.findOneBy({
            id: id,
        });

    }
}