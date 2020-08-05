import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

const Choises = () => {
	const choises = ['restaurant', 'fast-food', 'traiteur', 'hotel', 'afficher tout'];
	return (
		<>
			<h1>Que cherchez-vous ?</h1>
			<ul className={ utilStyles.list }>
				{
					choises.map((choise, index) => (
						<li className={ utilStyles.listItem } key={ index}>
							<Link href="/content/[result]" as={`/content/${choise}`}>
								<a className="">
								{ choise }
								</a>
							</Link>
						</li>
					))
				}
			</ul>

			<style jsx>{`
				a {
					text-transform: uppercase;
				}
			`}</style>
		</>
	);
};

export default Choises;