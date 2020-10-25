import MdClose from 'react-ionicons/lib/MdClose';

const CloseButton = ({ closeButtonRef, close, closeButtonDisplay }) => {
	return (
		<div
			ref={ closeButtonRef } 
			className="flex items-center ml1 dim" 
			title="fermer"
		>
			<MdClose 
				onClick={ close }
				fontSize="25px"
				className={ closeButtonDisplay + ' pointer' }
				color="silver"
			/>
		</div>
	);
};

export default CloseButton;