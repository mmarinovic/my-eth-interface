import { Erc20Abi } from '../Erc20Abi';

const TRANSFER_ETHER = 'TRANSFER_ETHER';
const TRANSFER_TOKEN = 'TRANSFER_TOKEN';

export function transferEther(web3, toAddress, fromAddress, amount, gasLimit, success, error){
    const request = web3.eth.sendTransaction({ 
        to: toAddress, 
        from: fromAddress, 
        value: web3.utils.toWei(amount.toString()),
        gasLimit
    }).then(success, error);

    return {
        type: TRANSFER_ETHER,
        payload: request
    }
}

export function transferTokens(web3, contractAddress, toAddress, fromAddress, amount, gasLimit, success, error){
    const tokenContract = new web3.eth.Contract(Erc20Abi, contractAddress);
    const request = tokenContract.methods.transfer(toAddress, amount).send({
        from: fromAddress,
        gas: gasLimit
    }).then(success, error);

    return {
        type: TRANSFER_TOKEN,
        payload: request
    }
}