import React, { ChangeEvent, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Form } from '@unform/web';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import mapIcon from '../../utils/mapIcon';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface IMarkerProps {
    latitude: number;
    longitude: number;
}

interface IFormData {
    name: string;
    about: string;
    whatsapp: string;
    instructions: string;
    opening_hours: string;
}

const OrphanageRegister: React.FC = function () {

    const [markerPosition, setMarkerPosition] = useState<IMarkerProps>();
    const [openWeekend, setOpenWeekend] = useState<boolean>(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const history = useHistory();

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setMarkerPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    function handleImages(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {

            const selectedImages = Array.from(event.target.files);

            selectedImages.map(function (image) {
                setImages([...images, image]);
                setPreviewImages([...previewImages, URL.createObjectURL(image)]);
                return image;
            });
        }
    }

    async function handleSubmit(data: IFormData) {
        const { name, about, whatsapp, instructions, opening_hours } = data;

        const formData = new FormData();

        formData.append("name", name);
        formData.append("about", about);
        formData.append("latitude", String(markerPosition?.latitude));
        formData.append("longitude", String(markerPosition?.longitude));
        formData.append("instructions", instructions);
        formData.append("opening_hours", opening_hours);
        formData.append("open_on_weekends", String(openWeekend));

        images.forEach(function (image) {
            formData.append("images", image);
        });

        await api.post('/orphanages', formData);

        alert('Cadatro realizado porra!');

        history.push('/orphanages');
    }

    return (
        <div id="page-register">

            <Sidebar />

            <div className="content">

                <Form onSubmit={handleSubmit} className="form">
                    <fieldset>
                        <legend> Dados </legend>

                        <div className="map-container">
                            <Map
                                center={[-23.7642633, -46.6802013]}
                                style={{ width: '100%', height: 280 }}
                                zoom={15}
                                className="map"
                                onclick={handleMapClick}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />

                                {markerPosition &&
                                    <Marker interactive={false} icon={mapIcon} position={[markerPosition.latitude, markerPosition.longitude]} />
                                }
                            </Map>

                            <p> Clique no mapa para adicionar a localização </p>
                        </div>


                        <Input name="name" label="Nome" />

                        <Textarea name="about" label="Sobre" description="Máximo de 300 caracteres" />

                        <Input name="whatsapp" label="Número de Whatsapp" />

                        <div className="image-block">
                            <span> Fotos </span>

                            <div className="images-container">
                                {previewImages.map(function (image) {
                                    return (
                                        <div className="image" key={image}>
                                            <button type="button">
                                                <FiX size={16} color="#FF669D" />
                                            </button>
                                            <img src={image} alt="preview" />
                                        </div>
                                    );
                                })}

                                <label htmlFor="images[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                                <input type="file" id="images[]" onChange={handleImages} />
                            </div>

                        </div>

                    </fieldset>

                    <fieldset>
                        <legend> Visitação </legend>

                        <Textarea name="instructions" label="Instruções" />

                        <Input name="opening_hours" label="Horários das visitas" />

                        <div className="button-block">
                            <span> Atende fim de semana? </span>

                            <div className="button-container">
                                <button
                                    type="button"
                                    className={openWeekend ? 'yes' : ''}
                                    onClick={function () {
                                        setOpenWeekend(true);
                                    }}
                                >
                                    Sim
                                </button>

                                <button
                                    type="button"
                                    className={!openWeekend ? 'no' : ''}
                                    onClick={function () {
                                        setOpenWeekend(false);
                                    }}
                                >
                                    Não
                                </button>
                            </div>
                        </div>

                    </fieldset>

                    <button type="submit"> Confirmar </button>
                </Form>
            </div>
        </div>
    );
}

export default OrphanageRegister;