import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import OrphanageContainer from '../../components/OrphanageContainer';

import api from '../../services/api';

import IOrphanage from '../../interfaces/IOrphanage';

import './styles.css';

const Dashboard: React.FC = function () {

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

    useEffect(function () {
        async function getOrphanages() {
            const response = await api.get('/orphanages');

            let orphanagesNotPending: IOrphanage[] = [];

            response.data.forEach(function (orphanage: IOrphanage) {
                if (!orphanage.pending) {
                    orphanagesNotPending.push(orphanage);
                }
            });

            if (orphanagesNotPending) {
                setOrphanages(orphanagesNotPending);
            }
        }

        getOrphanages();
    }, []);

    return (
        <div id="dashboard">
            <div className="content">
                <Sidebar isRestricted linkPath="/" indexActive = {0} />

                <main>
                    <Header title="Orfanatos cadastrados" quantOrphanages={orphanages.length} />

                    <OrphanageContainer orphanages={orphanages} isPending={false} />

                </main>
            </div>
        </div>
    );
}

export default Dashboard;