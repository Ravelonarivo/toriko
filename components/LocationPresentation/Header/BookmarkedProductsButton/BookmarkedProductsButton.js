import IosBookmarkOutline from 'react-ionicons/lib/IosBookmarkOutline';

const BookmarkedProductsButton = () => {
	return (
		<div className="ml2 flex items-center" title="lister les produits sauvegardés">
			<IosBookmarkOutline
				fontSize="31px"
				style={{ cursor: 'pointer' }}
			/>
		</div>
	);
};	

export default BookmarkedProductsButton;