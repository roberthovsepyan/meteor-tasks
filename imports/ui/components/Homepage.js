import React, {Component} from 'react';

import CardCreator from './CardCreator';
import Cards from './Cards';

export default class Homepage extends Component {

    render () {
        return (
            <div>
                <CardCreator/>
                <Cards/>
            </div>
        );
    }
}
