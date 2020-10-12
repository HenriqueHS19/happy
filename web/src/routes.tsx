import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';

const Routes: React.FC = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/" component={OrphanageMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;