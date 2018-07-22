import _ from 'underscore';
import { LOAD_TOKENS, LOAD_TOKEN_BALANCE } from '../actions/tokenActions';

export default function(state = [], action){
    switch(action.type){
        case LOAD_TOKENS:
            return action.payload.data.tokens;
        case LOAD_TOKEN_BALANCE:
            const newState = [...state];
            const token = _.findWhere(newState, { address: action.payload.contractAddress});
            // token.balance = action.payload.balance;
            token.balance = 5;

            return newState;
    }

    return state;
}