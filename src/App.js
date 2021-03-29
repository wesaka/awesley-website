import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';

import HomePage from "./pages/homepage.component";
import Database from "./pages/database.component";

const App = () => {
    return (
        <div>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/database' component={Database}/>
        </div>
    );
};

export default App;
