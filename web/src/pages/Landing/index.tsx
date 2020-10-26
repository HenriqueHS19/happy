import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

import './styles.css';

const Landing: React.FC = function () {

    return (
        <div id="landing">
            <div className="content">
                <img src={logo} alt="Happy"/>

                <main>
                    <h1> Leve felicidade para o mundo</h1>
                    <p> Visite orfanatos e mude o dia de muitas crianças. </p>
                </main>

                <div className="location">
                    <strong> São Paulo </strong>
                    <span> São Paulo </span>
                </div>

                <Link to="/orphanages">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>

            </div>
        </div>
    );
}

export default Landing;