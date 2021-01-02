import React from 'react';
import { FiArrowRight, FiEdit3, FiTrash } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import IOrphanages from '../../interfaces/IOrphanage';

import mapIcon from '../../utils/mapIcon';
import emptyIcon from '../../images/empty.svg';

import './styles.css';

interface IOrphanageBox {
    orphanages: IOrphanages[];
    isPending: boolean;
}

const OrphanageContainer: React.FC<IOrphanageBox> = function ({ orphanages, isPending }) {

    return (
        <>
            <div id="orphanage-box">
                {orphanages.map(function (orphanage) {
                    return (
                        <div className="box" key={orphanage.id}>
                            <div className="map-container">
                                <Map
                                    center={[orphanage.latitude, orphanage.longitude]}
                                    style={{ width: '100%', height: 280 }}
                                    zoom={15}
                                    className="map"
                                >
                                    <TileLayer
                                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                    />

                                    <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                                </Map>
                            </div>

                            <div className="info">
                                <p> {orphanage.name} </p>

                                <div className="options">
                                    {!isPending ?
                                        <>
                                            <Link to="/">
                                                <FiEdit3 size={20} />
                                            </Link>

                                            <Link to={`/orphanage/delete/${orphanage.id}`}>
                                                <FiTrash size={20} />
                                            </Link>
                                        </>
                                        :
                                        <Link to={`/pending/orphanage/${orphanage.id}`}>
                                            <FiArrowRight size={20} />
                                        </Link>
                                    }

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {orphanages.length === 0 &&
                <div className="empty">
                    <img src={emptyIcon} alt="Vazio" />
                    <p> Nenhum no momento </p>
                </div>
            }
        </>
    );
}

export default OrphanageContainer;