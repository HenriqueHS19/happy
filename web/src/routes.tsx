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
import PendingOrphanages from './pages/PendingOrphanges';
import PendingOrphanageDetail from './pages/PendingOrphanageDetail';
import DeletePage from './pages/DeletePage';

const Routes: React.FC = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />

                <Route path="/login" exact component={Login} />
                <Route path="/login/forgot-password" component={ForgotPassword} />

                <Route path="/orphanages" exact component={OrphanageMap} />
                <Route path="/orphanage/create" exact component={CreateOrphanage} />
                <Route path="/orphange/create/success" component={SuccessPage} />
                <Route path="/orphanage/:id" exact component={Orphanage} />
                <Route path="/orphanage/delete/:id" component={DeletePage} />

                <Route path="/dashboard" component={Dashboard} />

                <Route path="/pending/orphanages" component={PendingOrphanages} />
                <Route path="/pending/orphanage/:id" component={PendingOrphanageDetail} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;