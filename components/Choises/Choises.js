import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

const Choises = ({ locationTypes }) => {
	return (
		<div>
			<h1>Que cherchez-vous ?</h1>
			<ul className={ utilStyles.list }>
				{
					locationTypes.map((locationType, index) => (
						<li className={ utilStyles.listItem } key={ index }>
							<Link href="/result/[locationTypeName]" as={`/result/${locationType.name}`}>
								<a>
									{ locationType.name }
								</a>
							</Link>
						</li>
					))
				}
				<li className={ utilStyles.listItem }>
					<Link href="/result/[locationTypeName]" as="/result/afficher-tout">
						<a>
							Afficher tout
						</a>
					</Link>
				</li>
			</ul>

			<style jsx>{`
				a {
					text-transform: uppercase;
				}
			`}</style>
		</div>
	);
};

export default Choises;