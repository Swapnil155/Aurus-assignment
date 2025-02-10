import * as yup from 'yup';

export const SearchSchema = {

    query: yup.object().shape({

        page: yup.number().integer().min(1).optional().default(1),
        size: yup.number().integer().min(1).optional().default(10),
        search: yup.string().max(100).optional(),
        
    }),

}