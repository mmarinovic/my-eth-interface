import { UNLOCK_WITH_PRIVATE_KEY, UNLOCK_WITH_META_MASK } from '../actions/accountActions';

export default function(state = null, action){
    switch(action.type){
        case UNLOCK_WITH_PRIVATE_KEY:
        case UNLOCK_WITH_META_MASK:
            return action.web3;
    }

    return state;
}