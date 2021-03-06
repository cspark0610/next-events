export async function getAllEvents() {
	const res = await fetch('https://events-next-23ae1-default-rtdb.firebaseio.com/events.json');
	const data = await res.json();
	// data is an object with keys of event ids
	const events = [];
	for (let key in data) {
		events.push({
			...data[key],
			id: key,
		});
	}
	return events;
}

export async function getFeaturedEvents() {
	const allEvents = await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
	const allEvents = await getAllEvents();
	return allEvents.find((event) => event.id == id);
}

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;
	const allEvents = await getAllEvents();

	let filteredEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
	});

	return filteredEvents;
}
