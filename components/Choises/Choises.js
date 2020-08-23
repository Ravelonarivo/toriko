import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

const Choises = ({ locationTypes }) => {
	return (
		<div>
			<h1>Que cherchez-vous ?</h1>
			<ul className={ utilStyles.list }>
				{
					locationTypes.map((type, index) => (
						<li className={ utilStyles.listItem } key={ index }>
							<Link href="/result/[locationType]" as={`/result/${type.name}`}>
								<a>
									{ type.name }
								</a>
							</Link>
						</li>
					))
				}
				<li className={ utilStyles.listItem }>
					<Link href="/result/[locationType]" as="/result/afficher-tout">
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