import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import OrphanageBox from '../../components/OrphanageBox';

import './styles.css';

const Dashboard: React.FC = function () {
    return (
        <div id="dashboard">
            <div className="content">
                <Sidebar isRestricted />

                <main>
                    <Header title="Orfanatos cadastrados" quantOrphanages={2} />

                    <OrphanageBox isPendingOrphanage = {false} />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;