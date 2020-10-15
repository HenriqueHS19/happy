import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarkerIcon from '../../images/map-marker.svg';

import 'leaflet/dist/leaflet.css';

import './styles.css';

const OrphanageMap: React.FC = function () {
    return (
        <div id="page-map">

            <div className="side-bar">
                <div className="info">
                    <img src={mapMarkerIcon} alt="Happy" />

                    <h2> Escolha um orfanato no mapa </h2>
                    <p> Muitas crianças estão esperando a sua visita :)</p>
                </div>

                <div className="location">
                    <strong> São Paulo </strong>
                    <p> São Paulo </p>
                </div>
            </div>

            <Map
                center={[-23.7646544, -46.6802013]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>

            <Link to="/register-orphanage" className="btnOrphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMap;