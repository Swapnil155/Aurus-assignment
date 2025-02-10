import api from './api.service'

interface IParams {
    search?: string;
    page: number;
    size: number;
}

export const getAllEvent = async (
    params: IParams = { page: 1, size: 10 },
    signal?: AbortSignal
) => await api.get('/event', { signal, params })

export const getByIdEvent = async (
    id: number,
    signal?: AbortSignal
) => await api.get(`/event/${id}`, { signal })

export const createEvent = async (
    body: unknown,
    signal?: AbortSignal
) => await api.post('/event', body, { signal })

export const UpdateEvent = async (
    id: number,
    body: unknown,
    signal?: AbortSignal
) => await api.patch('/event/' + id, body, { signal })

export const deleteEvent = async (
    id: number,
    signal?: AbortSignal
) => await api.delete('/event/' + id, { signal })