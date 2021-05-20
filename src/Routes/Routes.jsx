import React from 'react'
import {Route, Switch} from "react-router-dom";
import {Dashboard} from '../Pages/Dashboard';

const Routes = () => {

    return (
        <>
        <Switch>
            <Route path="/" exact>
                <Dashboard/>
            </Route>
            <Route exact>
                <h2>Error</h2>
            </Route>
        </Switch>
        </>
    )
}

export {Routes}
