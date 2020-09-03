import LocationType from './locationType';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';


const LocationTypes = ({ locationTypes, townName, resetTownName }) => {
	return (
		<div>
			<h1>Que cherchez-vous à { townName }?</h1>
			<ul className={ utilStyles.list }>
				{
					locationTypes.map((locationType, index) => (
						<LocationType 
							locationType={ locationType }
							townName={ townName }
							key={ index }
						/>
					))
				}
				
				<li className={ utilStyles.listItem }>
					<Link href="/result/[...param]" as={`/result/${ townName }/afficher-tout`}>
						<a>
							Afficher tout
						</a>
					</Link>
				</li>
			</ul>

			<button onClick={ resetTownName } >Changer de ville</button>

			<style jsx>{`
				a {
					text-transform: uppercase;
				}
			`}</style>
		</div>
	);
};

export default LocationTypes;