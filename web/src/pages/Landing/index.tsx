import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import getLocation from '../../utils/getLocation';

import logo from '../../images/logo.svg';

import './styles.css';

const Landing: React.FC = function () {

    getLocation();

    return (
        <div id="landing">
            <div className="content">
                <header>
                    <div className="container-logo">
                        <img src={logo} alt="Happy" />

                        <div className="location">
                            <strong> São Paulo </strong>
                            <span> São Paulo </span>
                        </div>
                    </div>

                    <Link to="/login">
                       Acesso restrito
                    </Link>
                </header>

                <main>
                    <h1> Leve felicidade para o mundo</h1>
                    <p> Visite orfanatos e mude o dia de muitas crianças. </p>
                </main>

                <Link to="/orphanages" className="btnApp">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>

            </div>
        </div>
    );
}

export default Landing;