import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTokens, loadTokenBalance } from '../actions/tokenActions';
import NewToken from './NewToken';

class TokenList extends Component {

    state = {
        isAddTokenModalVisible: false
    }

    componentDidMount(){
        this.props.loadTokens();
    }

    render(){
        return (
            <div>
                <NewToken />
                <br />
                <ul className="list-group">
                    {this.props.tokens.map(token => (
                        <li className="list-group-item" key={token.address}>
                            {token.symbol} 
                            {token.balance >= 0 
                                ? <span> {token.balance}</span>
                                : <button className="btn btn-link" onClick={() => this.loadBalance(token)}>Click to load balance</button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    loadBalance = (token) => {
        this.props.loadTokenBalance(this.props.web3, this.props.accounts.selected, token.address);
    }
}

function mapStateToProps({ web3, tokens, accounts }){
    return { web3, tokens, accounts };
}

export default connect(mapStateToProps, { loadTokens, loadTokenBalance })(TokenList);