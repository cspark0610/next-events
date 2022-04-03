//import { useRouter } from 'next/router';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

export default function EventDetailPage(props) {
	// const router = useRouter();
	// const eventId = router.query.eventId;
	// const event = getEventById(eventId);
	const event = props.eventById;
	if (!event) {
		return <p>Event not found</p>;
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}

export async function getStaticProps(ctx) {
	const eventById = await getEventById(ctx.params.eventId);
	return {
		props: {
			eventById: eventById || null,
		},
		revalidate: 30,
	};
}

// also generate dinamic Paths for each event
// for which event Ids it should pre render a different page path
export async function getStaticPaths() {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({
		params: { eventId: event.id },
	}));
	return {
		paths: paths,
		// cuando en paths se espeficican todas las rutas posibles, fallback va como "false"
		fallback: 'blocking',
	};
}
