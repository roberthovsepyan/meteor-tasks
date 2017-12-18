import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import cardsReducer from './cards';
import itemsReducer from './items';

export const allReducers=combineReducers({
    form: formReducer,
    cards: cardsReducer,
    items: itemsReducer
});