import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from '@/components/ui/file-upload';
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Box, Card, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";


interface FormValues {
    firstName: string
    lastName: string
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
    } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => console.log(data))

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
                        <Stack gap="4" align="flex-start" maxW={'600px'}>

                            <Field label="Event Name" required invalid={!!errors.lastName} errorText={errors.firstName?.message} helperText="We'll never share your email."  >
                                <Input
                                    {...register("firstName", { required: "First name is required" })}
                                    placeholder="Enter your event name" variant="flushed" />
                            </Field>

                            <Field label="Event Date" required helperText="We'll never share your email." >
                                <Input type="Date" placeholder="Enter your email" variant="flushed" />
                            </Field>

                            <Field label="Event Artifacts type" required helperText="We'll never share your email." >
                                <RadioGroup defaultValue="1">
                                    <HStack gap="6">
                                        <Radio value="1">Image</Radio>
                                        <Radio value="0">Video</Radio>
                                    </HStack>
                                </RadioGroup>
                            </Field>

                            <Field label="Event Artifacts" required helperText="We'll never share your email." >
                                <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
                                    <FileUploadDropzone
                                        label="Drag and drop here to upload"
                                        description=".png, .jpg up to 5MB"
                                    />
                                    <FileUploadList />
                                </FileUploadRoot>
                            </Field>

                            <Field label="Event Venue" required helperText="We'll never share your email." >
                                <Input placeholder="Enter your event venue" variant="flushed" />
                            </Field>

                            <HStack>
                                <Button type="submit">Submit</Button>
                                <Button variant={'ghost'} onClick={() => navigate(-1)}>Cancel</Button>
                            </HStack>
                        </Stack>
                    </form>
                </Box>
            </Card.Root>
        </Box>
    );
};

export default EditEvent;