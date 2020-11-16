import React, { useEffect, useState, useCallback } from 'react';
import { FiClock, FiAlertCircle } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';
import IOrphanage from '../../interfaces/IOrphanage';

import whatsappIcon from '../../images/whatsapp.svg';

import './styles.css';

interface IParams {
    id: string;
}

const Orphanage: React.FC = function () {

    const [orphanage, setOrphanage] = useState<IOrphanage>();
    const [imageIndex, setImageIndex] = useState(0);

    const params: IParams = useParams();

    const getOrphanage = useCallback(async function () {
        const id = Number(params.id);

        const response = await api.get(`/orphanages/${id}`);

        setOrphanage(response.data);

    }, [params.id]);

    useEffect(function () {
        getOrphanage();
    }, [getOrphanage]);

    return (
        <div id="page-orphanage">
            <Sidebar isRestricted={false} />

            <main>

                <div className="content">
                    <div className="container-images">

                        <img src={orphanage?.images[imageIndex].path} alt={orphanage?.name} className="featured-image" />

                        <div className="images">
                            {orphanage?.images.map(function (image, index) {
                                return (
                                    <button
                                        key={image.id}
                                        type="button"
                                        className={imageIndex === index ? 'active': ''}
                                        onClick={function () {
                                            setImageIndex(index);
                                        }}
                                    >
                                        <img src={image.path} alt={image.path} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="info-orphanage">

                        <h1 className="title"> {orphanage?.name} </h1>

                        <p> {orphanage?.about} </p>

                        {orphanage &&
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

                                <a
                                    target="_blank"
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                                    rel="noopener noreferrer"
                                >
                                    Ver rotas no Google Maps
                                </a>
                            </div>
                        }

                        <hr />

                        <h3 className="title instructions"> Instruções para visita </h3>

                        <p> {orphanage?.instructions} </p>

                        <div className="card-block">
                            <div className="card">
                                <FiClock size={32} color="#15B6D6" />
                                <p> Horário de visitas das {orphanage?.opening_hours} </p>
                            </div>

                            {orphanage?.open_on_weekends ?
                                (<div className="card green">
                                    <FiAlertCircle size={32} />
                                    <p> Atendemos fim de semana </p>
                                </div>)
                                :
                                (<div className="card red">
                                    <FiAlertCircle size={32} />
                                    <p> Não atendemos fim de semana </p>
                                </div>)
                            }
                        </div>

                        <button>
                            <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Orphanage;