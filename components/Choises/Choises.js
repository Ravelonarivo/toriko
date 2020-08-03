import Link from 'next/link';

const Choises = () => {
	return (
		<div>
			<h1>Que cherchez-vous ?</h1>
	      	<Link href="/content/results"><a>Restaurant</a></Link><br/>
	      	<Link href="/content/results"><a>Fast-Food</a></Link><br/>
	      	<Link href="/content/results"><a>Traiteur</a></Link><br/>
	      	<Link href="/content/results"><a>Hotel</a></Link><br/>
	      	<Link href="/content/results"><a>Afficher tout</a></Link><br/>
		</div>
	);
};

export default Choises;