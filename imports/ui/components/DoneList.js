import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {lightGreenA200} from 'material-ui/styles/colors';
import { DropTarget } from 'react-dnd';

import {ItemTypes} from "../itemTypes";
import {store} from "../../../client/main";
import {moveItem} from "../actions/items";

const style={
    width: 400,
    margin: 20,
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: lightGreenA200,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.4)'
};

const dividerStyle={
    backgroundColor: 'black',
    opacity: '0.3'
};

const dropSource = {
    canDrop (props, monitor) {
        const item=monitor.getItem();
        let decider=true;
        if (item.state!=='doing') {decider=false;}
        return decider;
    },
    drop (props, monitor) {
        const item=monitor.getItem();
        store.dispatch(moveItem({cardId: item.cardId, id: item.id, state: 'done'}))
    }
};

function collect (connect) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class DoneList extends Component {
    render () {
        return this.props.connectDropTarget(
            <span>
            <Card initiallyExpanded style={style}>
                <CardHeader title="Завершенные дела" actAsExpander showExpandableButton/>
                <Divider style={dividerStyle}/>
                <CardText expandable>
                    {this.props.children}
                </CardText>
            </Card>
            </span>
        );
    }
}

DoneList = DropTarget(ItemTypes.ITEM, dropSource, collect)(DoneList);

export default DoneList;