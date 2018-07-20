import { ACCOUNT_SELECTED, ACCOUNTS_LOADED } from '../actions/accountActions';

export default function(state = {}, action){
    switch(action.type){
        case ACCOUNT_SELECTED:
            return {...state, selected: action.address};
        case ACCOUNTS_LOADED:
            return {...state, all: action.accounts};
    }

    return state;
}