import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Input from '../../components/Input';

import logo from '../../images/map-marker.svg';

import './styles.css';
import Textarea from '../../components/Textarea';

const OrphanageRegister: React.FC = function () {
    return (
        <div id="page-register">
            <div className="side-bar">
                <img src={logo} alt="Happy" />

                <Link to="/app">
                    <FiArrowLeft size={24} color="#fff" />
                </Link>
            </div>

            <div className="content">
                <h2> Adicione um orfanato </h2>

                <div className="form">
                    <fieldset>
                        <legend> Dados </legend>

                        <Input name="name" label="Nome" />

                        <Textarea name="about" label="Sobre" description="Máximo de 300 caracteres" />

                        <Input name="whatsapp" label="Número de Whatsapp" />
                    </fieldset>

                    <fieldset>
                        <legend> Visitação </legend>

                        <Textarea name="instructions" label="Instruções" />

                        <Input name="visiting" label="Horários das visitas" />

                        {/* <div className="checkbox-block">
                            <label htmlFor="weekend"> Atende fim de semana? </label>
                            <input type="checkbox" name="weekend" id="weekend"/>
                        </div> */}

                    </fieldset>

                    <button> Confirmar </button>
                </div>
            </div>
        </div>
    );
}

export default OrphanageRegister;