import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
    FileUploadDropzone,
    FileUploadList,
    FileUploadRoot,
} from '@/components/ui/file-upload';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Box, Card, Heading, HStack, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { UpdateEvent } from '@/service/event.service';

// Validation Schema using Yup
const eventSchema = yup.object().shape({
    eventName: yup.string().required('Event name is required'),
    eventDate: yup.date().required('Event date is required'),
    artifactType: yup.string().oneOf(['1', '0'], 'Invalid artifact type'),
    eventVenue: yup.string().required('Event venue is required'),
    artifacts: yup.array().of(yup.mixed<File>().test('is-file', 'Invalid file', value => value instanceof File)).default([])
});

interface FormValues {
    eventName: string;
    eventDate: Date;
    artifactType?: string;
    eventVenue: string;
    artifacts: (File | undefined)[];
}
// Main Event component
const EditEvent: React.FC = () => {

    const { id } = useParams()

    console.log(id);


    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(eventSchema),
    });

    const onSubmit = handleSubmit(async (_data) => {
        try {
            const { data, status } = await UpdateEvent(Number(id), _data)
            console.log(data, status);

        } catch (error) {
            console.log(error);
        }
    })

    return (
        <Box position={'relative'} minH="100vh" display="flex" flexDirection="column"
            _after={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                backgroundColor: '#000',
                height: '300px',
                zIndex: '9'
            }}>
            <Card.Root m={10} p={5} zIndex={'99'}>
                <Heading ml={2}>Edit Events</Heading>
                <Box m={2}>
                    <form onSubmit={onSubmit}>
                        <Stack gap='4' align='flex-start' maxW={'600px'}>
                            {/* Event Name */}
                            <Field
                                label='Event Name'
                                required
                                invalid={!!errors.eventName}
                                errorText={errors.eventName?.message}>
                                <Input
                                    {...register('eventName')}
                                    placeholder='Enter your event name'
                                    variant='flushed'
                                />
                            </Field>

                            {/* Event Date */}
                            <Field
                                label='Event Date'
                                required
                                invalid={!!errors.eventDate}
                                errorText={errors.eventDate?.message}>
                                <Input
                                    {...register('eventDate')}
                                    type='date'
                                    variant='flushed'
                                />
                            </Field>

                            {/* Event Artifact Type */}
                            <Field label='Event Artifacts Type' required>
                                <RadioGroup defaultValue='1'>
                                    <HStack gap='6'>
                                        <Radio {...register('artifactType')} value='1'>
                                            Image
                                        </Radio>
                                        <Radio {...register('artifactType')} value='0'>
                                            Video
                                        </Radio>
                                    </HStack>
                                </RadioGroup>
                                {errors.artifactType && (
                                    <Box color='red.500' fontSize='sm'>
                                        {errors.artifactType.message}
                                    </Box>
                                )}
                            </Field>

                            {/* Event Artifacts */}
                            <Field label='Event Artifacts' required {...register('artifacts')}>
                                <FileUploadRoot maxW='xl' alignItems='stretch' maxFiles={10}>
                                    <FileUploadDropzone
                                        label='Drag and drop here to upload'
                                        description='.png, .jpg up to 5MB'
                                    />
                                    <FileUploadList />
                                </FileUploadRoot>
                            </Field>

                            {/* Event Venue */}
                            <Field
                                label='Event Venue'
                                required
                                invalid={!!errors.eventVenue}
                                errorText={errors.eventVenue?.message}>
                                <Input
                                    {...register('eventVenue')}
                                    placeholder='Enter your event venue'
                                    variant='flushed'
                                />
                            </Field>

                            <HStack>
                                <Button type='submit'>Submit</Button>
                                <Button variant={'ghost'} onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>
                            </HStack>
                        </Stack>
                    </form>
                </Box>
            </Card.Root>
        </Box>
    );
};

export default EditEvent;