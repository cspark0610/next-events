import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AllEventsPage(props) {
	const { events } = props;
	const router = useRouter();

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		// esta funcion se encargara SOLO de la navegacion programatica con userRouter de next
		router.push(fullPath);
	};

	return (
		<>
			<Head>
				<title>{events.title}</title>
				<meta name="description" content="content about description of events" />
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();
	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}
