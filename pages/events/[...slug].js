import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { getFilteredEvents } from '../../dummy-data';

export default function FileteredEventsPage() {
	const router = useRouter();

	const filteredRouteData = router.query.slug;
	//console.log(filteredRouteData) [...slug] = ['2020', '3']
	if (!filteredRouteData) {
		return <p className="center">Loading...</p>;
	}

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
		return <p className="center">Invalid Filter Date, adjust your values</p>;
	}
	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	if (!filteredEvents.length || !filteredEvents) {
		return <p className="center">No Events Found for chosen year and month</p>;
	}
	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}
