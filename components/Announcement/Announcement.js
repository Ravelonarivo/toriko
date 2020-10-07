import { formatText } from '../../lib/functions';

const Announcement = ({ announcement }) => {
	return (
		<div className="w-100 flex mb3 br1 h3 pa1 shadow-4 pointer grow">
			{
				announcement.image 
					? 	<div className="w3 mr1">
							<img className="w-100 h-100 br1" src={ announcement.image} />
						</div>
					: 	''
			}
			<div className={ announcement.image ? 'w-70' : 'w-100' }>
				<h5 className="mv0">{ announcement.title }</h5>
				<p className="mv1 f7 lh-title">{ formatText(announcement.detail, 46) }</p>
			</div>
		</div>
	);
};

export default Announcement;