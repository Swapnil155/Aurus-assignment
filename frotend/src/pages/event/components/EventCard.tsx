import { Button } from '@/components/ui/button';
import {
	Box, Image, Stack,
	Text
} from '@chakra-ui/react';
import React from 'react';

// Define a TypeScript type for the event prop
interface Event {
	name: string;
	image: string;
	date: string;
	attendees: string;
}

// Define a TypeScript type for the EventCard component props
interface EventCardProps {
	event: Event;
}

// EventCard component with strict typing
const EventCard: React.FC<EventCardProps> = ({ event }) => (
	<Box borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" >
		<Image src={event.image} alt={event.name} w="100%" h="150px" />
		<Box p="4">
			<Text fontWeight="bold" fontSize="lg" mb="2" color="gray.600">
				Event Name: {event.name}
			</Text>
			<Text fontSize="sm" color="gray.600">
				{event.date} | {event.attendees}
			</Text>
			<Stack direction="row" mt="4">
				<Button size="sm">
					Edit
				</Button>
				<Button size="sm">
					Delete
				</Button>
			</Stack>
		</Box>
	</Box>
);

export default EventCard;
