import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Button from '../ui/button';
import classes from './event-item.module.css';
import Image from 'next/image';
// classes sera el objeto que contenga todo el archivo de css del componente event-item

export default function EventItem(props) {
	const { title, image, date, location, id } = props;
	const localDateString = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const formatedAddress = location.replace(', ', '\n');
	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<Image src={'/' + image} alt={title} width={250} height={160} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{localDateString}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formatedAddress}</address>
					</div>
				</div>
				<div className={classes.action}>
					<Button link={exploreLink}>
						<span>Explore Link</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}
