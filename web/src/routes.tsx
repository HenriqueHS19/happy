import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';


const Routes: React.FC = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/orphanages" component={OrphanageMap} />
                <Route path="/orphanage/create" component={CreateOrphanage} />
                <Route path="/orphanage/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;