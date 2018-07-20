import React, { Component } from 'react';
import swal from 'sweetalert';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { unlockAccountWithPrivateKey, unlockAccountWithMetaMask } from '../actions/unlockAccountAction';

class UnlockAccount extends Component {

    state = {
        privateKey: '',
        isPrivateKeyModalVisible: false
    }

    render(){
        return (
            <div>
                <h3>Unlock your account to get started </h3>
                <div>
                    <button className="btn btn-primary" onClick={() => this.setState({ isPrivateKeyModalVisible: true })}>Private key</button>
                    <button className="btn btn-primary" onClick={this.unlockWithMetaMask}>MetaMask</button>
                </div>
                {this.renderPrivateKeyModal()}
             </div>
        );
    }

    renderPrivateKeyModal = () => {
        return (
            <div className="static-modal">
                <Modal show={this.state.isPrivateKeyModalVisible}>
                    <Modal.Header>
                        <Modal.Title>Enter your private key to unlock wallet</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input className="form-control" type="text" placeholder="Your Ethereum private key" onChange={(e) => this.setState({ privateKey: e.target.value })}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => this.setState({ isPrivateKeyModalVisible: false })}>Close</button>
                        <button className="btn btn-primary" onClick={this.unlockWithPrivateKey}>Unlock</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    unlockWithPrivateKey = () => {
        if(!this.state.privateKey){
            return swal("Warning!", "Private key not valid", "warning");
        }

        this.setState({ isPrivateKeyModalVisible: false });
        this.props.unlockAccountWithPrivateKey(this.state.privateKey);
    }

    unlockWithMetaMask = () => {
        if(!window.web3.currentProvider){
            return swal("Warning!", "MetaMask not found in your browser. Install it first.", "warning");
        }
        
        this.props.unlockAccountWithMetaMask();
    }
}

export default connect(null, { unlockAccountWithPrivateKey, unlockAccountWithMetaMask })(UnlockAccount);