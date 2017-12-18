import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Redirect} from 'react-router-dom';

import TodoList from './TodoList';
import DoingList from './DoingList';
import DoneList from './DoneList';
import ListItem from './ListItem';

class ActiveCard extends Component {

    renderHeading () {
        let heading = this.props.match.params.id.match(/_.+$/);
        return heading[0].substr(1);
    };

    findCardId () {
        let id = this.props.match.params.id.match(/^.+_/);
        return id[0].substr(0, id[0].length-1);
    };

    renderItems() {
        let items_todo=[], items_doing=[], items_done=[];
            if (this.props.items!==undefined) {
                this.props.items.forEach((item) => {
                    if (item.cardId === this.findCardId()) {
                        switch (item.state) {
                            case 'todo':
                                items_todo.push(<ListItem key={item.id} id={item.id} cardId={item.cardId}
                                                          state={item.state}>{item.name}</ListItem>);
                                break;
                            case 'doing':
                                items_doing.push(<ListItem key={item.id} id={item.id} cardId={item.cardId}
                                                           state={item.state}>{item.name}</ListItem>);
                                break;
                            case 'done':
                                items_done.push(<ListItem key={item.id} id={item.id} cardId={item.cardId}
                                                          state={item.state}>{item.name}</ListItem>);
                                break;
                        }
                    }
                });
            }
        return {todo: items_todo, doing: items_doing, done: items_done};
    };

    render () {
        //redirect to home on logout
        if (!this.props.userId) {return <Redirect to="/"/>}
        return (
            <div>
                <h1>{this.renderHeading()}</h1>
                <TodoList cardId={this.findCardId()}>
                    {this.renderItems().todo}
                </TodoList>
                <DoingList cardId={this.findCardId()}>
                    {this.renderItems().doing}
                </DoingList>
                <DoneList cardId={this.findCardId()}>
                    {this.renderItems().done}
                </DoneList>
            </div>
        );

    }
}

ActiveCard = connect((state) => ({items: state.items}))(ActiveCard);

ActiveCard = withRouter(ActiveCard);

ActiveCard = withTracker(() => {
    return {
        userId: Meteor.userId(),
    }
})(ActiveCard);

export default ActiveCard;