import Product from './Product/Product';
import Announcement from './Announcement/Announcement';

const Popup = ({ popupRef, closeButtonRef, display, close, content, contentType }) => {
	return (
		<div 
			ref={ popupRef }
			className={ display + ' w-100 h-100 fixed bg-black-60 left-0 top-0 items-center justify-center' } 
			style={{ zIndex: '10' }}
			onClick={ close }
		>
			<div className="w-30 h-75 bg-white br3">
				{
					contentType === 'product' 
						?	<Product
								product={ content }
								closeButtonRef={ closeButtonRef }
								close={ close }
							/>	
						: 	<Announcement
								announcement={ content }
								closeButtonRef={ closeButtonRef }
								close={ close }
							/>
				}
			</div>
		</div>
	);
};

export default Popup;