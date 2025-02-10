import { Button } from '@/components/ui/button';
import {
    Box,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react';
import React from 'react';

// Define a TypeScript interface for the event data structure
interface Event {
    name: string;
    date: string;
    attendees: string;
    image: string;
}

// Array of events with type annotations
const events: Event[] = [
    {
        name: 'Holi Event',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        name: 'Holi Event (Video)',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        name: 'Easter Sunday',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        name: 'IPL Grand Opening Match MI VS CSK',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
    {
        name: 'Easter Sunday',
        date: '22 March, 2020',
        attendees:
            'Darshan Paradkar, Debashish, Lopesh Chandekar, Anas, and Sandeep Sharma',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_960_720.jpg',
    },
];

// Define a TypeScript type for the EventCard component props
interface EventCardProps {
    event: Event;
}

// EventCard component with strict typing
const EventCard: React.FC<EventCardProps> = ({ event }) => (
    <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        bg="white"
    >
        <Image src={event.image} alt={event.name} w="100%" h="150px" />
        <Box p="4">
            <Text fontWeight="bold" fontSize="lg" mb="2" color="gray.600">
                Event Name: {event.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
                {event.date}
            </Text>
            <Text fontSize="sm" mt="2" lineBreak={'auto'} color="gray.600">
                Attendees: {event.attendees}
            </Text>
            <Stack direction="row" mt="4">
                <Button color={'red'} background={'bg.muted'} size="sm">
                    Edit
                </Button>
                <Button colorScheme="red" size="sm">
                    Delete
                </Button>
            </Stack>
        </Box>
    </Box>
);

// Main Event component
const Event: React.FC = () => {
    return (
        // <Box minH="100vh">
        <Box minH="100vh" display="flex" flexDirection="column">
        <Box flex="1" bg="black" display="flex" justifyContent="center" alignItems="center" h={"50vh"}>
            <Heading color="white">All Events</Heading>
        </Box>
        <Box flex="1" bg="white" p={4}>
            <SimpleGrid columns={[1, 2, 3]}>
                {events.map((event, index) => (
                    <Box p={2} key={index}>
                        <EventCard event={event} />
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    </Box>
    



        // </Box>
    );
};

export default Event;
