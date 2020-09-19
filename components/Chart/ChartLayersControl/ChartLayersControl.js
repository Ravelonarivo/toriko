import { TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import Markers from '../Markers/Markers';

const ChartLayersControl = ({ layerControlRef, specialities, checkedLayersControlOverlay, saveSpecialitiesFilterState, searchFieldValue, townName, productSearch, searchedProduct, productTypeSearch, searchedProductType, districtSearch, searchedDistrict, locationSearch, searchedLocation, locations, locationType, getSearchedLocations, speciality, markerIcons, isGeolocationEnable, getDistanceBetweenLocationAndUserLocation, userLocation, saveSearch }) => {
	return (
		<div>
			<LayersControl position="bottomleft" ref={ layerControlRef }>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				{
					specialities.map((speciality) => (
						<LayersControl.Overlay name={speciality.name} key={speciality.name} checked={checkedLayersControlOverlay(speciality.name)}>
							<LayerGroup
								onRemove={saveSpecialitiesFilterState}
								onAdd={saveSpecialitiesFilterState}
							>
								<Markers
									searchFieldValue={searchFieldValue}
									townName={townName}

									productSearch={productSearch}
									searchedProduct={searchedProduct}

									productTypeSearch={productTypeSearch}
									searchedProductType={searchedProductType}

									districtSearch={districtSearch}
									searchedDistrict={searchedDistrict}

									locationSearch={locationSearch}
									searchedLocation={searchedLocation}
									locations={locations}
									locationType={locationType}
									getSearchedLocations={getSearchedLocations}

									speciality={speciality}
									markerIcons={markerIcons}
									isGeolocationEnable={isGeolocationEnable}
									getDistanceBetweenLocationAndUserLocation={getDistanceBetweenLocationAndUserLocation}
									userLocation={userLocation}

									saveSearch={saveSearch}
								/>
							</LayerGroup>
						</LayersControl.Overlay>
					))
				}
			</LayersControl>
		</div>
	);
};

export default ChartLayersControl;