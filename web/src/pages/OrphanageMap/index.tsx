import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../../utils/mapIcon';
import IOrphanage from '../../interfaces/IOrphanage';
import api from '../../services/api';

import mapMarkerIcon from '../../images/map-marker.svg';

import './styles.css';

const OrphanageMap: React.FC = function () {

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

    const getOrphanages = useCallback(async function () {
        const response = await api.get('/orphanages');

        setOrphanages(response.data);
    }, []);

    useEffect(function () {
        getOrphanages();
    }, [getOrphanages]);

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

                {orphanages.map(function (orphanage) {
                    return (
                        <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
                            <Popup closeButton={false} minWidth={270} maxWidth={270} className="map-popup">
                                {orphanage.name}

                                <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanage/create" className="btnOrphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanageMap;