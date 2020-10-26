import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../images/map-marker.svg';

import './styles.css';

const Sidebar: React.FC = function () {
    return (
        <aside>
            <img src={logo} alt="Happy" />

            <Link to="/orphanages">
                <FiArrowLeft size={24} color="#fff" />
            </Link>
        </aside>

    );
}

export default Sidebar;