import Web3 from 'web3';
import PrivateKeyProvider from 'truffle-privatekey-provider';

import { UNLOCK_WITH_PRIVATE_KEY, UNLOCK_WITH_META_MASK } from '../actions/accountActions';

const INFURA_PROVIDER = 'https://rinkeby.infura.io/';

export default function(state = null, action){
    switch(action.type){
        case UNLOCK_WITH_PRIVATE_KEY:
            return new Web3(new PrivateKeyProvider(action.privateKey, INFURA_PROVIDER));
        case UNLOCK_WITH_META_MASK:
            return new Web3(window.web3.currentProvider);
    }

    return state;
}