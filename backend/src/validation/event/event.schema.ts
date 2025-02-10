import { isValidFileSize } from './../../utils/helper/isValidFileSize';
import * as yup from 'yup';

export const EventSchema = {


    body: yup.object({

        eventName: yup.string().required(),
        eventDate: yup.string().required(),
        eventTime: yup.string().notRequired(),
        eventVenue: yup.string().required(),
        isImage: yup.boolean(),

        eventArtifacts: yup.array().of(yup.mixed()).default([]), // Ensure it matches expected structure
        eventAttendee: yup.array().of(yup.mixed()).default([]),

    }).noUnknown(),


    files: yup.object().shape({

        eventArtifacts: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test('isFile', 'File size exceeds limit', (value: unknown): boolean => {
                        if (!value || !(value instanceof File)) return true; // No file is allowed
                        return isValidFileSize(value);
                    })
            )
            .default([])
            .optional(),

        eventAttendee: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test('isFile', 'File size exceeds limit', (value) => {
                        if (!value || !(value instanceof File)) return true;
                        return isValidFileSize(value);
                    })
            )
            .default([])
            .optional(),

    }).noUnknown(),



};

export const EventUpdateSchema = {

    body: yup.object().shape({

        eventName: yup.string().notRequired(),
        eventDate: yup.string().notRequired(),
        eventTime: yup.string().notRequired(),
        eventVenue: yup.string().notRequired(),
        isImage: yup.boolean().notRequired(),

        eventArtifacts: yup.array().of(yup.mixed()).default([]), // Ensure it matches expected structure
        eventAttendee: yup.array().of(yup.mixed()).default([]),

    }).noUnknown(),


    files: yup.object().shape({

        eventArtifacts: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test('isFile', 'File size exceeds limit', (value: unknown): boolean => {
                        if (!value || !(value instanceof File)) return true; // No file is allowed
                        return isValidFileSize(value);
                    })
            )
            .default([])
            .optional(),

        eventAttendee: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test('isFile', 'File size exceeds limit', (value) => {
                        if (!value || !(value instanceof File)) return true;
                        return isValidFileSize(value);
                    })
            )
            .default([])
            .optional(),

    }).noUnknown(),



};
