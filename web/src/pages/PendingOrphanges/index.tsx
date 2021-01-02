import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import OrphanageContainer from '../../components/OrphanageContainer';

import IOrphanage from '../../interfaces/IOrphanage';

import api from '../../services/api';

import './styles.css';

const PendingOrphanage: React.FC = function () {

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

    useEffect(function () {
        async function getOrphanages() {
            const response = await api.get('/orphanages');

            let orphanagesPending: IOrphanage[] = [];

            response.data.forEach(function (orphanage: IOrphanage) {
                if (orphanage.pending) {
                    orphanagesPending.push(orphanage);
                }
            });

            if (orphanagesPending) {
                setOrphanages(orphanagesPending);
            }
        }

        getOrphanages();
    }, []);

    return (
        <div id="pending-orphanage">
            <div className="content">
                <Sidebar isRestricted linkPath="/" indexActive={1} />

                <main>
                    <Header title="Cadastros pendentes" quantOrphanages={orphanages.length} />

                    <OrphanageContainer orphanages={orphanages} isPending />

                </main>
            </div>
        </div>
    );
}

export default PendingOrphanage;