import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/styles.scss';
import 'materialize-css/dist/css/materialize.min.css'
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
