
import React from 'react';
import { combineReducers } from 'redux';
import { render } from 'react-dom';
import Index from '../Index/views/Index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


import '../../../css/devices-list.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../../css/index.css';
import '../../../css/graphics.css';
import '../../../css/add-device.css';
import 'font-awesome/css/font-awesome.min.css';

let preloadedState;

const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true
});

import devices from '../Devices/reducers';
import buildingChooser from '../BuildingChooser/reducers';
import hallChooser from '../HallChooser/reducers';
import hallPlanView from '../HallPlanView/reducers';
import levelSelector from '../LevelSelector/reducers';
import index from '../Index/reducers';
import authorization from '../Authorization/reducers';

const combinedReducers = combineReducers(
    {
        devices,
        buildingChooser,
        hallChooser,
        hallPlanView,
        levelSelector,
        index,
        authorization
    });

const combinedMiddlewares = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(combinedReducers, preloadedState, combinedMiddlewares);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Index />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('app')
);



