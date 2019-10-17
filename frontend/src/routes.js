import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; // all letra maiuscula pq sao componentes do react

/*
    Criar uma pasta para cada rota e um index.js para ser estilizado separadamente
    cada elemento mais tarde
*/
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

export default function Routes() {

    // switch garante que apenas uma rota seja executada ao mesmo tempo
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />                
            </Switch>

        </BrowserRouter>
    );
}   