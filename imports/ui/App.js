import React, {Component} from 'react';
import { Route, Switch, Link} from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Blaze from 'meteor/gadicc:blaze-react-component';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {deepPurple900} from 'material-ui/styles/colors';

import Homepage from './components/Homepage';
import {NotFound} from './components/NotFound';
import ActiveCard from './components/ActiveCard';


class App extends Component {
    render() {
        return (
            <div>
                <div className='head'>
                    <FloatingActionButton
                        backgroundColor={deepPurple900}
                        containerElement={<Link to="/"/>}>
                        <ActionHome/>
                    </FloatingActionButton>
                    <span className="login">
                        <Blaze template="loginButtons"/>
                    </span>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route path="/card/:id" component={ActiveCard}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

App = DragDropContext(HTML5Backend)(App);

export default App;