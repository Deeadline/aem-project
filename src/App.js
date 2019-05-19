import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from './utils/routes';
import { Layout } from './components/shared/layout';

// import { Home } from './components/home';
import { Mobius } from './algorithms/mobius';
import { Euler } from './algorithms/euler';
import { DiffieHellman } from './algorithms/diffiehellman';
import { Rsa } from './algorithms/rsa';

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
