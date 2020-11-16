import React, { useState } from 'react';
import { FiAlertCircle, FiArrowLeft, FiMapPin, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../images/map-marker.svg';

import './styles.css';

interface ISideBar {
    isRestricted: boolean;
}

const Sidebar: React.FC<ISideBar> = function ({ isRestricted }) {

    const [isActive, setIsActive] = useState('dashboard');

    console.log(isActive);

    return (
        <aside>
            <img src={logo} alt="Happy" />

            { isRestricted ?
                <>
                    <div className="container-buttons">
                        <Link to="/dashboard" className={isActive === 'dashboard' ? 'active': ''} onClick={function () {
                            setIsActive('dashboard');
                        }}>
                            <FiMapPin size={24} />
                        </Link>

                        <Link to="/pending-registration" className={isActive === 'pending' ? 'active': ''} onClick={function () {
                            setIsActive('pending');
                        }}>
                            <FiAlertCircle size={24} />
                        </Link>
                    </div>

                    <Link to="/">
                        <FiPower size={24} />
                    </Link>
                </>
                :
                <Link to="/orphanages">
                    <FiArrowLeft size={24} />
                </Link>
            }

        </aside>

    );
}

export default Sidebar;