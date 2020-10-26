import Leaflet from 'leaflet';

import mapMarkerIcon from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerIcon,
    iconSize: [58, 58],
    iconAnchor: [29, 58],
    popupAnchor: [190, 5],
});

export default mapIcon;