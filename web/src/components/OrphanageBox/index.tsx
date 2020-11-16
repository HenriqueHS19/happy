import React from 'react';
import { FiArrowRight, FiEdit3, FiTrash } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import mapIcon from '../../utils/mapIcon';

import './styles.css';

interface IOrphanageBox {
    isPendingOrphanage: boolean;
}

const OrphanageBox: React.FC<IOrphanageBox> = function ({ isPendingOrphanage }) {
    return (
        <div id="orphanage-box">
            <div className="box">
                <div className="map-container">
                    <Map
                        center={[-27.0434343, -27.0434343]}
                        style={{ width: '100%', height: 280 }}
                        zoom={15}
                        className="map"
                    >
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        />

                        <Marker interactive={false} icon={mapIcon} position={[-27.0434343, -27.0434343]} />
                    </Map>
                </div>

                <div className="info">
                    <p> Nome do orfanato </p>

                    <div className="options">
                        {!isPendingOrphanage ?
                            <>
                                <button>
                                    <FiEdit3 size={20} />
                                </button>

                                <button>
                                    <FiTrash size={20} />
                                </button>
                            </>
                            :
                            <button>
                                <FiArrowRight size={20} />
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrphanageBox;