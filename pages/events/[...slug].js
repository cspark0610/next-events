import Head from 'next/head';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { getFilteredEvents } from '../../helpers/api-util';

export default function FileteredEventsPage(props) {
	const router = useRouter();

	// const filteredRouteData = router.query.slug;
	//console.log(filteredRouteData) [...slug] = ['2020', '3']
	// if (!filteredRouteData) {
	// 	return <p className="center">Loading...</p>;
	// }

	// const filteredYear = filteredRouteData[0];
	// const filteredMonth = filteredRouteData[1];
	// const numYear = parseInt(filteredYear, 10);
	// const numMonth = parseInt(filteredMonth, 10);

	if (props.hasError) {
		return <p className="center">Invalid Filter Date, adjust your values</p>;
	}

	const filteredEvents = props.events;

	if (!filteredEvents.length || !filteredEvents) {
		return <p className="center">No Events Found for chosen year and month</p>;
	}
	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<>
			<Head>
				<title>Filtered Events</title>
				<meta name="description" content={`all evnts for ${props.date.year} and $ ${props.date.month}`} />
			</Head>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}

// getServerSideProps es mas apropiado en este caso

export async function getServerSideProps(ctx) {
	const filteredRouteData = ctx.params.slug;

	const filteredYear = filteredRouteData[0];
	const filteredMonth = filteredRouteData[1];
	const numYear = parseInt(filteredYear, 10);
	const numMonth = parseInt(filteredMonth, 10);

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1 ||
		numMonth > 12
	) {
		return {
			props: { hasError: true },
			notFound: true,
		};
	}
	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: filteredEvents,
			date: {
				year: numYear,
				month: numMonth,
			},
		},
	};
}
