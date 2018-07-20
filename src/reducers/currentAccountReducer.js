import { SET_CURRENT_ACCOUNT } from '../actions/accountActions';

export default function(state = null, action){
    switch(action.type){
        case SET_CURRENT_ACCOUNT:
            return action.address;
    }

    return state;
}