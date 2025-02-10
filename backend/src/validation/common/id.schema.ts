import * as yup from 'yup';

export const IdSchema = {

    params: yup.object().shape({

        id: yup
            .number()
            .nullable()
            .typeError('ID must be a number')
            .positive('ID must be a positive number')
            .required('ID is required'),
            
    }),
}