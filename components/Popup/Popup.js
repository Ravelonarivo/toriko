import Product from './Product/Product';
import Announcement from './Announcement/Announcement';
import Advertisement from './Advertisement/Advertisement';

const Popup = ({ popupRef, closeButtonRef, visibilityAndOpacity, close, content, contentType }) => {
	return (
		<div 
			ref={ popupRef }
			className={ 'w-100 h-100 fixed bg-black-60 left-0 top-0 flex items-center justify-center' } 
			style={{ ...visibilityAndOpacity, zIndex: '10', transition: 'opacity 0.5s, visibility 0.5s' }}
			onClick={ close }
		>
			<div className="w-30 h-75 bg-white br3">
				{
					contentType === 'product' 
						?	<Product
								product={ content }
								closeButtonRef={ closeButtonRef }
								close={ close }
								visibilityAndOpacity={ visibilityAndOpacity }
							/>	
						: 	contentType === 'announcement' 
								?	<Announcement
										announcement={ content }
										closeButtonRef={ closeButtonRef }
										close={ close }
										visibilityAndOpacity={ visibilityAndOpacity }
									/>
								: 	<Advertisement
										advertisement={ content }
										closeButtonRef={ closeButtonRef }
										close={ close }
										visibilityAndOpacity={ visibilityAndOpacity }
									/>	
				}
			</div>
		</div>
	);
};

export default Popup;