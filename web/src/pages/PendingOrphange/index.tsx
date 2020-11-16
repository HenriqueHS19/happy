import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import OrphanageBox from '../../components/OrphanageBox';

import './styles.css';

const PendingOrphanage: React.FC = function () {
    return (
        <div id="pending-orphanage">
            <div className="content">
                <Sidebar isRestricted />

                <main>
                    <Header title="Cadastros pendentes" quantOrphanages={1} />

                    <OrphanageBox isPendingOrphanage />
                </main>
            </div>
        </div>
    );
}

export default PendingOrphanage;