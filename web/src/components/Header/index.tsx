import React from 'react';

import './styles.css';

interface IHeader {
    title: string;
    quantOrphanages: number;
}

const Header: React.FC<IHeader> = function ({ title, quantOrphanages }) {
    return (
        <header id="header-app">
            <h1> {title} </h1>
            <p> {quantOrphanages} orfanato(s) </p>
        </header>
    );
};

export default Header;