import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../Pages/Home';
import Description from '../Pages/Description';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route component={Description} path="/description/:id" exact />
                <Route component={Home} path="/" exact />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;