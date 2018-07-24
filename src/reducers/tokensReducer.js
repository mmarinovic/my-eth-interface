import _ from 'underscore';
import { LOAD_TOKENS, LOAD_TOKEN_BALANCE, ADD_TOKEN,  } from '../actions/tokenActions';
import { TRANSFER_TOKEN } from '../actions/transactionActions';

export default function(state = [], action){
    switch(action.type){
        case LOAD_TOKENS:
            return action.payload.data.tokens;
        case LOAD_TOKEN_BALANCE:    
            return _loadTokenBalance(state, action);
        case ADD_TOKEN:
            return _addToken(state, action);
        case TRANSFER_TOKEN: 
            return _transferToken(state, action);
    }

    return state;
}

function _loadTokenBalance(state, action){
    const newState = [...state];
    const token = _.findWhere(newState, { address: action.payload.contractAddress});
    token.balance = action.payload.balance;
    return newState;
}

function _addToken(state, action){
    const newState = [...state];
    const token = _.findWhere(newState, { address: action.token.contractAddress });
    if(token){
        token.symbol = action.token.symbol;
        token.contractAddress = action.token.contractAddress;
    }else{
        newState.push({ symbol: action.token.symbol, address: action.token.contractAddress });
    }
    return newState;
}

function _transferToken(state, action){
    console.log(action.payload);
    return state;
}