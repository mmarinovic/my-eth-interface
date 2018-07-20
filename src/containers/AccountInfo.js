import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentAccount } from '../actions/accountActions';

class AccountInfo extends Component {

    state = {
        account: '',
        ethBalance: ''
    }

    componentDidMount(){
        this.props.web3.eth.getAccounts()
        .then(accounts => {
            const selectedAddress = accounts[0];
            this.setState({ account: selectedAddress });
            this.props.setCurrentAccount(selectedAddress);
            return selectedAddress;
        })
        .then(selectedAddress => {
            this.props.web3.eth.getBalance(selectedAddress)
            .then(balance => {
                this.setState({ ethBalance: this.props.web3.utils.fromWei(balance) });
            });
        });
    }

    render(){
        return (
            <div>
                <div>Account address: {this.state.account}</div>
                <div>ETH balance: {this.state.ethBalance} ETH</div>
            </div>
        );
    }
}

function mapStateToProps({ web3 }){
    return { web3} ;
}

export default connect(mapStateToProps, { setCurrentAccount })(AccountInfo);