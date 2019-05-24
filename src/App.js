import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from './utils/routes';
import { Layout } from './components/shared/layout';

// import { Home } from './components/home';
import { Mobius } from './components/mobius/mobius.component';
import { Euler } from './components/euler/euler.component';
import { DiffieHellman } from './components/hellman/hellman.component';
import { Rsa } from './components/rsa/rsa.component';

function App() {
    return (
        <Layout>
            <Switch>
                {/* <Route exact path={ROUTES.HOME} component={Home} /> */}
                <Route path={ROUTES.MOBIUS} component={Mobius} />
                <Route path={ROUTES.EULER} component={Euler} />
                <Route path={ROUTES.DIFFIE_HELLMAN} component={DiffieHellman} />
                <Route path={ROUTES.RSA} component={Rsa} />
            </Switch>
        </Layout>
    );
}

export default App;
