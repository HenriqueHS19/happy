import React from 'react';
import { FiAlertCircle, FiArrowLeft, FiMapPin, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../images/map-marker.svg';

import './styles.css';

interface ISideBar {
    isRestricted: boolean;
    linkPath: string;
    indexActive?: number;
}

const Sidebar: React.FC<ISideBar> = function ({ isRestricted, linkPath, indexActive }) {

    return (
        <aside>
            <img src={logo} alt="Happy" />

            { isRestricted ?
                <>
                    <div className="container-buttons">
                        <Link to="/dashboard" className={indexActive === 0 ? 'active': ''} >
                            <FiMapPin size={24} />
                        </Link>

                        <Link to="/pending/orphanages" className={indexActive === 1 ? 'active': ''} >
                            <FiAlertCircle size={24} />
                        </Link>
                    </div>

                    <Link to={linkPath}>
                        <FiPower size={24} />
                    </Link>
                </>
                :
                <Link to={linkPath}>
                    <FiArrowLeft size={24} />
                </Link>
            }

        </aside>

    );
}

export default Sidebar;