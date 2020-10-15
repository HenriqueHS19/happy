import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';
import OrphanageRegister from './pages/OrphanageRegister';

const Routes: React.FC = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanageMap} />
                <Route path="/register-orphanage" component={OrphanageRegister} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;