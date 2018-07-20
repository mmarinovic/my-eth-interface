import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { unlockAccountWithPrivateKey, unlockAccountWithMetaMask, selectAccount } from '../actions/accountActions';
import MyModal from '../components/MyModal';

class UnlockAccount extends Component {

    state = {
        privateKey: '',
        isPrivateKeyModalVisible: false
    }

    render(){
        if(this.props.accounts.all){
            return (
                <div>
                    <h3>Select unlocked account</h3>
                    <ul className="list-group col-md-3">
                        {this.props.accounts.all.map(address => (
                            <li className="list-group-item" key={address} onClick={() => this.selectAccount(address)}>{address}</li>
                        ))}
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <h3>Unlock account to get started</h3>

                <button className="btn btn-primary" onClick={() => this.setState({ isPrivateKeyModalVisible: true })}>Private key</button>
                <button className="btn btn-primary" onClick={this.unlockWithMetaMask}>MetaMask</button>
                {this.renderPrivateKeyModal()}
            </div>
        )
    }

    renderPrivateKeyModal = () => {

        const unlockWithPrivateKey = () => {
            if(!this.state.privateKey){
                return swal("Warning!", "Private key not valid", "warning");
            }
    
            this.setState({ isPrivateKeyModalVisible: false });
            this.props.unlockAccountWithPrivateKey(this.state.privateKey);
        }

        const modalBody = <input className="form-control" type="text" placeholder="Your Ethereum private key" onChange={(e) => this.setState({ privateKey: e.target.value })}/>;
        const modalFooter = (
            <div>
                <button className="btn btn-danger" onClick={() => this.setState({ isPrivateKeyModalVisible: false })}>Close</button>
                <button className="btn btn-primary" onClick={unlockWithPrivateKey}>Unlock</button>
            </div>
        );

        return (
            <MyModal
            show={this.state.isPrivateKeyModalVisible}
            title="Enter your private key to unlock wallet"
            body={modalBody}
            footer={modalFooter}
            />
        )
    }

    unlockWithMetaMask = () => {
        if(!window.web3.currentProvider){
            return swal("Warning!", "MetaMask not found in your browser. Install it first.", "warning");
        }
        
        this.props.unlockAccountWithMetaMask();
    }

    selectAccount = (address) => {
        this.props.selectAccount(address);
    }
}

function mapStateToProps({web3, accounts}){
    return {web3, accounts};
}

export default connect(mapStateToProps, { unlockAccountWithPrivateKey, unlockAccountWithMetaMask, selectAccount })(UnlockAccount);