import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    SimpleGrid
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './components/EventCard';
import { deleteEvent, getAllEvent } from '@/service/event.service';

// Main Event component
const Event: React.FC = () => {

    const [events, setEvents] = useState([])

    const fetchEvent = async () => {
        try {
            const { data } = await getAllEvent()
            setEvents(data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])


    const deleteEvents = async (id: number) => {
        try {
            const { data, status } = await deleteEvent(id)
            console.log(data, status);

        } catch (error) {
            console.log(error);
        }
    }


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
                <Flex justify={'space-between'}>
                    <Heading ml={2}>All Events</Heading>
                    <Link to={'/add'}  >
                        <Button>Add Event</Button>
                    </Link>
                </Flex>
                <Box>
                    <SimpleGrid columns={[1, 2, 3]}>
                        {events.map((event, index) => (
                            <Box p={2} key={index}>
                                <EventCard event={event} deleteHandler={deleteEvents} />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Card.Root>
        </Box>
    );
};

export default Event;
