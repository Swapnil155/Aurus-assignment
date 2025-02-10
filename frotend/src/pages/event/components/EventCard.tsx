import { Button } from '@/components/ui/button';
import { DialogRoot, DialogTrigger } from '@/components/ui/dialog';
import {
	Box, Image, Stack,
	Text
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from './deleteDialog';

// Define a TypeScript type for the event prop
interface Event {
	id: number;
	name: string;
	image: string;
	date: string;
	attendees: string;
}

// Define a TypeScript type for the EventCard component props
interface EventCardProps {
	event: Event;
	deleteHandler: (id: number) => Promise<void>
}

// EventCard component with strict typing
const EventCard: React.FC<EventCardProps> = ({ event, deleteHandler }) => {
	const navigate = useNavigate()
	return (
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
					<Button size="sm" onClick={() => navigate('/edit/' + event.id)}>
						Edit
					</Button>


					<DialogRoot size={'sm'}>

						<DialogTrigger asChild>
							<Button size="sm" >
								Delete
							</Button>
						</DialogTrigger>

						<DeleteDialog deleteHandler={() => deleteHandler(event.id)} />
					</DialogRoot>
				</Stack>
			</Box>
		</Box>
	)
};

export default EventCard;
