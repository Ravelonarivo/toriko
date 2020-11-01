import CloseButton from '../../CloseButton/CloseButton';
import Image from '../../Image/Image';

const Advertisement = ({ advertisement, closeButtonRef, close, visibilityAndOpacity }) => {
	return (
		<div className="w-100 h-100" style={{ ...visibilityAndOpacity }}>
			<div className="flex items-center pa1 bb b--moon-gray">
				<h3 className="mv0 tc w-100">{ advertisement.title }</h3>
				<CloseButton
					closeButtonRef={ closeButtonRef }
					close={ close }
					closeButtonDisplay='db'
				/>
			</div>			
			<div style={{ height: '89%' }}>
				<Image
					image={ advertisement.image }
					imageStyle="w-100 h-100"
				/>
			</div>
		</div>
	);
};

export default Advertisement;