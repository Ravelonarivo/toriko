import MdInformation from 'react-ionicons/lib/MdInformation';

const InformationButton = () => {
	return (
		<div className="ba br2 b--light-silver ml3 mv3 h2 w2 tc pointer" style={{ transform: 'translateY(12px)' }} title="Afficher informations">
			<MdInformation
				fontSize="30px"
			/>
		</div>	
	);
};

export default InformationButton;