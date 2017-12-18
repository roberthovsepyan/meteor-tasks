import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Random } from 'meteor/random';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {yellow200} from 'material-ui/styles/colors';
import { Field, reduxForm,} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Divider from 'material-ui/Divider';

import {store} from "../../../client/main";
import {addItem} from "../actions/items";

const style={
    width: 400,
    margin: 20,
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: yellow200,
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
const invalidName = value => (value.length > 25 ? 'Название не должно содержать более 25 символов' : undefined);

class TodoList extends Component {
    submit = (values) => {
        store.dispatch(addItem({id: Random.id(), name: values.todo, state: 'todo', cardId: this.props.cardId}));
        this.props.reset();
    };

    //so that validation works on form reset
    componentWillReceiveProps(nextProps) {
        if (this.props.popUpState !== nextProps.popUpState) {
            this.props.initialize();
        }
    };

    render () {
        return (
            <Card initiallyExpanded style={style}>
                <CardHeader title="Список дел" actAsExpander showExpandableButton/>
                <Divider style={dividerStyle}/>
                <CardText expandable>
                    Добавьте дело
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <Field name="todo" component={TextField} underlineStyle={fieldStyle} validate={[required, invalidName]}/>
                    </form>
                    {this.props.children}
                </CardText>
            </Card>
        );
    }
}

TodoList = connect((state) => ({items: state.items}))(TodoList);

TodoList = reduxForm({
    form: 'todo',
    destroyOnUnmount: false
})(TodoList);

export default TodoList;