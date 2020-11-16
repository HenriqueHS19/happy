import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OrphanageMap from './pages/OrphanageMap';
import CreateOrphanage from './pages/CreateOrphanage';
import SuccessPage from './pages/SuccessPage';
import Orphanage from './pages/Orphanage';
import Dashboard from './pages/Dashboard';
import PendingOrphanage from './pages/PendingOrphange';

const Routes: React.FC = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/login/forgot-password" component={ForgotPassword} />
                <Route path="/orphanages" component={OrphanageMap} />
                <Route path="/orphanage/create" exact component={CreateOrphanage} />
                <Route path="/orphange/create/success" component={SuccessPage} />
                <Route path="/orphanage/:id" component={Orphanage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/pending-registration" component={PendingOrphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;