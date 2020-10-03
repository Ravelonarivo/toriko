import MdInformation from 'react-ionicons/lib/MdInformation';

const InformationButton = ({ collapseInformations }) => {
	return (
		<div className="ba br2 b--light-silver ml3 mv3 h2 w2 tc pointer" style={{ transform: 'translateY(12px)' }} title="afficher plus d' informations">
			<MdInformation
				fontSize="30px"
				onClick={ collapseInformations }
			/>
		</div>	
	);
};

export default InformationButton;