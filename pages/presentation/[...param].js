import Head from 'next/head';

import LocationPresentation from '../../components/LocationPresentation/LocationPresentation';
import Menu from '../../components/Menu/Menu';
import Posts from '../../components/Posts/Posts';
import ProductTypesNav from '../../components/ProductTypesNav/ProductTypesNav';
import Popup from '../../components/Popup/Popup';

import { getLocations, getLocationBySlugAndTownName, getOpeningsByLocationSlugAndTownName, getPicturesByLocationSlugAndTownName  } from '../../lib/location';
import { getTowns } from '../../lib/town'; 
import { getProductsByLocationId, getProductTypesByLocationId } from '../../lib/product';
import { getAnnouncementsByLocationId } from '../../lib/announcement';
import { getAdvertisementsByLocationId } from '../../lib/advertisement';

import { useState, useRef } from 'react';

const Presentation = ({ locationProp, openingsProp, picturesProp, productsProp, productTypesProp, announcementsProp, advertisementsProp }) => {
	const productRefs = useRef([]);
	const menuProductTypeRefs = useRef([]);

	const popupRef = useRef(null);
	const popupCloseButtonRef = useRef(null);

	const [popupVisibilityAndOpacity, setPopupVisibilityAndOpacity] = useState({ visibility: 'hidden', opacity: '0' });
	const [popupContent, setPopupContent] = useState({});
	const [popupContentType, setPopupContentType] = useState('');

	const closePopup = event => {
		if (event.target === popupRef.current || event.target === popupCloseButtonRef.current || event.target === popupCloseButtonRef.current.firstElementChild || event.target === popupCloseButtonRef.current.firstElementChild.firstElementChild) {
			setPopupVisibilityAndOpacity({ visibility: 'hidden', opacity: '0' });
			setPopupContent({});
			setPopupContentType('');
		}
	};

	const openPopup = (content, type) => {
		setPopupVisibilityAndOpacity({ visibility: 'visible', opacity: '1' })
		setPopupContent(content);
		if (type === 'product') {
			setPopupContentType('product');
		} else if (type === 'announcement') {
			setPopupContentType('announcement');
		} else if (type === 'advertisement') {
			setPopupContentType('advertisement');
		}
	};

	return (
		<div>
			<Head>
				<title>{ locationProp.name }</title>
			</Head>
			
			<LocationPresentation 
				location={ locationProp  } 
				openings={ openingsProp }
				pictures={ picturesProp }
			/>

			<div className="bg-black-05 w-100">
				<ProductTypesNav
					productTypes={ productTypesProp }
					productRefs={ productRefs }
					products={ productsProp	}	
					menuProductTypeRefs={ menuProductTypeRefs }
				/>
				
				<div className="mh6 flex">
					<Menu
						products={ productsProp }
						productRefs={ productRefs }
						productTypes={ productTypesProp }
						menuProductTypeRefs={ menuProductTypeRefs }
						openPopup={ openPopup }
					/>
					<Posts
						location={ locationProp }
						advertisements={ advertisementsProp }
						announcements={ announcementsProp }
						openPopup={ openPopup }
					/>
				</div>
			</div>		
			<Popup 
				popupRef={ popupRef }
				closeButtonRef={ popupCloseButtonRef }
				visibilityAndOpacity={ popupVisibilityAndOpacity }
				close={ closePopup }
				content={ popupContent }
				contentType={ popupContentType }
			/>
		</div>
	);
};

export const getStaticPaths = async () => {
	try {
		const locations = await getLocations(); 
		const towns = await getTowns(); 

		let paths = [];
		towns.forEach(town => {
			locations.forEach(location => { 
				paths.push({ params: { param: [location.slug, town.name] }});
			});
		});

		return {
			paths, 
			fallback: false
		};
	} catch (error) {
		console.log(error);
	}
};

export const getStaticProps = async ({ params }) => {
	const [locationSlug, townName] = params.param;
	try {
		const [location] = await getLocationBySlugAndTownName(locationSlug, townName);
		const openings = await getOpeningsByLocationSlugAndTownName(locationSlug, townName);
		const pictures = await getPicturesByLocationSlugAndTownName(locationSlug, townName);
		const products = await getProductsByLocationId(location.id);
		const productTypes = await getProductTypesByLocationId(location.id);
		const announcements = await getAnnouncementsByLocationId(location.id);
		const advertisements = await getAdvertisementsByLocationId(location.id);

		return {
			props: {
				locationProp: location,
				openingsProp: openings,
				picturesProp: pictures,
				productsProp: products,
				productTypesProp: productTypes,
				announcementsProp: announcements,
				advertisementsProp: advertisements
			}, 
			revalidate: 1
		};
	} catch (error) {
		console.log(error)
	}
};

export default Presentation;