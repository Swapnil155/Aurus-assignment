import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    SimpleGrid
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './components/EventCard';

// Define a TypeScript interface for the event data structure
interface Event {
    id: number;
    name: string;
    date: string;
    attendees: string;
    image: string;
}

// Array of events with type annotations
const events: Event[] = [
    {
        id: 1,
        name: 'Holi Event',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        id: 2,
        name: 'Holi Event (Video)',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        id: 3,
        name: 'Easter Sunday',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        id: 4,
        name: 'IPL Grand Opening Match MI VS CSK',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        id: 5,
        name: 'Easter Sunday',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
];


// Main Event component
const Event: React.FC = () => {
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
                                <EventCard event={event} />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Box>
            </Card.Root>
        </Box>
    );
};

export default Event;
