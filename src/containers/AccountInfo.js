import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountInfo extends Component {

    state = {
        ethBalance: ''
    }

    componentDidMount(){
        this.props.web3.eth.getBalance(this.props.accounts.selected)
            .then(balance => {
                this.setState({ ethBalance: this.props.web3.utils.fromWei(balance) });
            });
    }

    render(){
        return (
            <div>
                <div>Account address: {this.props.accounts.selected}</div>
                <div>ETH balance: {this.state.ethBalance} ETH</div>
            </div>
        );
    }
}

function mapStateToProps({ web3, accounts }){
    return { web3, accounts };
}

export default connect(mapStateToProps)(AccountInfo);