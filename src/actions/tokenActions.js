import axios from 'axios';
import { Erc20Abi } from '../Erc20Abi';

export const LOAD_TOKENS = 'LOAD_TOKENS';
export const LOAD_TOKEN_BALANCE = 'LOAD_TOKEN_BALANCE';
export const ADD_TOKEN = 'ADD_TOKEN';

export function loadTokens(){
    const request = axios.get('/main.json');
    return {
        type: LOAD_TOKENS,
        payload: request
    }
}

export function loadTokenBalance(web3, selectedAccount, contractAddress){
    const tokenContract = new web3.eth.Contract(Erc20Abi, contractAddress);
    const request = tokenContract.methods.balanceOf(selectedAccount).call()
    .then(balance => {
        return {
            balance,
            contractAddress
        }
    });
    return {
        type: LOAD_TOKEN_BALANCE,
        payload: request
    }
}

export function addToken(symbol, contractAddress){
    return {
        type: ADD_TOKEN,
        token: { symbol, contractAddress }
    }
}