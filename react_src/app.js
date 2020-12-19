import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';


ReactDOM.render(<AppRouter/>,document.getElementById("app"));
