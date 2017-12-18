import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from '../imports/ui/App';
import { allReducers } from '../imports/ui/reducers/index';
import './main.css';
import '../imports/startup/accounts-config.js';

export const store=createStore(allReducers);

Meteor.startup(() => {
    render (
        <Provider store={store}>
            <Router>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
            </Router>
        </Provider>,
    document.getElementById('root')
    );
});