import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';

import HomePage from "./pages/homepage.component";
import Database from "./pages/database.component";
import MarkdownResume from "./pages/markdown-resume.component";

const App = () => {
    return (
        <div>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/database' component={Database}/>
            <Route exact path='/resume' component={MarkdownResume}/>
        </div>
    );
};

export default App;
