export const UNLOCK_WITH_PRIVATE_KEY = 'UNLOCK_WITH_PRIVATE_KEY';
export const UNLOCK_WITH_META_MASK = 'UNLOCK_WITH_META_MASK';
export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';

export function unlockAccountWithPrivateKey(privateKey){
    return {
        type: UNLOCK_WITH_PRIVATE_KEY,
        privateKey
    }
}

export function unlockAccountWithMetaMask(){
    return {
        type: UNLOCK_WITH_META_MASK
    }
}

export function setCurrentAccount(address) {
    return {
        type: SET_CURRENT_ACCOUNT,
        address
    }
}