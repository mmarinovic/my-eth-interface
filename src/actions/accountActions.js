import Web3 from 'web3';
import PrivateKeyProvider from 'truffle-privatekey-provider';

export const UNLOCK_WITH_PRIVATE_KEY = 'UNLOCK_WITH_PRIVATE_KEY';
export const UNLOCK_WITH_META_MASK = 'UNLOCK_WITH_META_MASK';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
export const ACCOUNTS_LOADED = 'ACCOUNTS_LOADED';

export function unlockAccountWithPrivateKey(privateKey){

    const INFURA_PROVIDER = 'https://rinkeby.infura.io/';
    const web3 = new Web3(new PrivateKeyProvider(privateKey, INFURA_PROVIDER));

    return dispatch => {
        dispatch({
            type: UNLOCK_WITH_PRIVATE_KEY,
            web3
        });

        web3.eth.getAccounts()
        .then(accounts => {
            console.log(accounts);
            dispatch({
                type: ACCOUNTS_LOADED,
                accounts
            });
        });
    }
}

export function unlockAccountWithMetaMask(){
    const web3 = new Web3(window.web3.currentProvider);

    return dispatch => {
        dispatch({
            type: UNLOCK_WITH_META_MASK,
            web3
        });

        web3.eth.getAccounts()
        .then(accounts => {
            dispatch({
                type: ACCOUNTS_LOADED,
                accounts
            });
        });
    }
}

export function selectAccount(address) {
    return {
        type: ACCOUNT_SELECTED,
        address
    }
}