import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';

const LocationType = ({ locationType, townName }) => {
	return (
		<div>
			<li className={ utilStyles.listItem }>
				<Link href="/result/[...param]" as={`/result/${ townName }/${locationType.name}`}>
					<a>
						{ locationType.name }
					</a>
				</Link>
			</li>

			<style jsx>{`
				a {
					text-transform: uppercase;
				}
			`}</style>
		</div>
	);
};
	
export default LocationType;

