import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';
import Head from 'next/head';

export default function HomePage(props) {
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta name="description" content="content about description of events" />
			</Head>
			<EventList items={props.events} />
		</div>
	);
}

// getServerSideProps or getStaticProps

export async function getStaticProps() {
	// would not need context parameter in this case, now i m fetching data events from firebase database not from dummy.json file
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 2500,
		// cada 41 minutes se actualiza la pagina
	};
}
