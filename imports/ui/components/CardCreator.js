import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {lightBlue100} from 'material-ui/styles/colors';
import { Field, reduxForm,} from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import {store} from "../../../client/main";
import {handleExpand, authorizationCheck} from "../actions/cards";

const style={
    width: 350,
    margin: 20,
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: lightBlue100,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.4)'
};

const dividerStyle={
    backgroundColor: 'black',
    opacity: '0.3'
};

const fieldStyle={
    borderColor: 'dimGrey'
};

//validation for the form
const required = value => (value === undefined ? 'Пожалуйста, введите название' : undefined);
const invalidName = value => (value.length > 20 ? 'Название не должно содержать более 20 символов' : undefined);

class CardCreator extends Component {
    submit = (values) => {
        if (!this.props.userId) {
            store.dispatch(authorizationCheck('Пожалуйста, авторизуйтесь'))
        }
        else {
            store.dispatch(authorizationCheck(''));
            Meteor.call('cards.insert', values.cardName);
            store.dispatch(handleExpand(!this.props.cards.expanded));
            this.props.reset();
        }
    };

    //so that validation works on form reset
    componentWillReceiveProps(nextProps) {
        if (this.props.popUpState !== nextProps.popUpState) {
            this.props.initialize();
        }
    };

    handleExpandChange () {
        store.dispatch(handleExpand(!this.props.cards.expanded));
    };

    render () {
        return (
            <Card style={style} expanded={this.props.cards.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
                <CardHeader title="Создай новую карточку!" subtitle="...или нет, как хочешь" actAsExpander showExpandableButton/>
                <Divider style={dividerStyle}/>
                <CardText expandable>
                    Придумайте название для карточки
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <Field name="cardName" component={TextField} validate={[required, invalidName]} underlineStyle={fieldStyle}/>
                    </form>
                    <div className="authCheck">
                        {this.props.cards.isAuth}
                    </div>
                </CardText>
            </Card>
        );
    }
}

CardCreator = connect((state) => ({cards: state.cards}))(CardCreator);

CardCreator = reduxForm({
    form: 'cardCreator',
    destroyOnUnmount: false
})(CardCreator);

CardCreator = withTracker(() => {
    return {
        userId: Meteor.userId()
    };
})(CardCreator);

export default CardCreator;