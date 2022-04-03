import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
	return (
		<div>
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
