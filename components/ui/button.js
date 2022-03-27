import Link from 'next/link';
import classes from './button.module.css';

/// para aplicar las clases de css debo wrappear las props en un anchor tag

function Button(props) {
	/*
    pasaje de props!!, props = { link: `/events/${id}`, children: 'Explore Link' } 
  */
	if (props.link) {
		return (
			<Link href={props.link}>
				<a className={classes.btn}>{props.children}</a>
			</Link>
		);
	}

	return (
		<button className={classes.btn} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

export default Button;
