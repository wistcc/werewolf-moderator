import { combineReducers } from 'redux';

import gameTypes from '../core/gameTypes';
import { 
    SET_SELECTED_DECK, 
    SET_PLAYERS,
    CHANGE_CARD_AMOUNT
} from '../actions/types';
import createReducer from '../lib/createReducer';

const players = createReducer(5, {
    [SET_PLAYERS](state, action) {
        return action.players;
    }
});

const selectedDeck = createReducer('', {
    [SET_SELECTED_DECK](state, action) {
        return action.selectedDeck;
    }
});

const deck = createReducer([], {
    [SET_SELECTED_DECK](state, action) {
        return action.deck;
    },
    [CHANGE_CARD_AMOUNT](state, action) {
        if(!state.some(k => k.key === action.card.key))
            return [...state, {key: action.card.key, amount: action.amount}];
        
        if(!action.amount)
            return [...state.filter(c => c.key !== action.card.key)];
        else
            return [
                ...state.filter(c => c.key !== action.card.key),
                { 
                    key: action.card.key, 
                    amount: action.amount,
                },
            ];
    }
});

const type = createReducer(gameTypes.balanced, {});

export default combineReducers({
    players,
    deck,
    selectedDeck,
    type,
});