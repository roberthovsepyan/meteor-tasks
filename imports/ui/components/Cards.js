import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

import {CardsDB} from "../../api/cards";
import {store} from "../../../client/main";
import {deleteItems} from "../actions/items";

const buttonStyle= {
    margin: '20px 0 20px 20px',
    height: 67,
    width: 200,
    textAlign: 'center',
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.4)'
};

class Cards extends Component {

    deleteCard (id) {
        Meteor.call('cards.remove', id);
        store.dispatch(deleteItems(id));
    };

    renderCards () {
        let buttons=[];
        this.props.cardsDB.forEach((card) => buttons.push(
            <span key={card._id}>
                <RaisedButton containerElement={<Link to={`/card/${card._id+'_'+card.name}`}/>} label={card.name || 1} primary style={buttonStyle}/>
                <IconButton onClick={this.deleteCard.bind(this, card._id)}>
                    <ContentClear/>
                </IconButton>
            </span>));
        return buttons;
    };

    render () {
        if (!this.props.ready) {return <p>Загрузка...</p>}
        return this.renderCards();
    }
}

Cards = withTracker(() => {
    let handle = Meteor.subscribe('cards');
    return {
        ready: handle.ready(),
        cardsDB: CardsDB.find().fetch()
    };
})(Cards);

export default Cards;