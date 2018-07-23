import React, { Component } from 'react';
import _ from 'underscore';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import MyModal from '../components/MyModal';
import { transferEther } from '../actions/transactionActions';
import swal from 'sweetalert';

class NewTransaction extends Component {

    state = {
        isConfirmModalVisible: false,
        formValues: {}
    }

    componentDidMount(){
        this.props.initialize({ gasLimit: '21000', currency: 'ETH' });
    }

    renderTextFieldComponent = (field) => {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    renderConfirmTransactionModal = () => {

        const modalBody = (
            <div>
                <div>From: {this.props.accounts.selected}</div>
                <div>To: {this.state.formValues.toAddress}</div>
                <div>Amount: {this.state.formValues.amount}</div>
                <div>Currency: {this.state.formValues.currency}</div>
            </div>
        )

        const modalFooter = (
            <div>
                <button className="btn btn-danger" onClick={() => this.setState({ isConfirmModalVisible: false })}>Cancel</button>
                <button className="btn btn-primary" onClick={this.sendTransaction}>Confirm</button>
            </div>
        );

        return (
            <MyModal 
                show={this.state.isConfirmModalVisible}
                title='Confirm transaction'
                body={modalBody}
                footer={modalFooter}
            />
        )
    }

    render(){
        const { handleSubmit } = this.props
        return (
            <div>
                <h1>Send Ether or Token</h1>
                <form onSubmit={handleSubmit((formValues) => this.setState({ isConfirmModalVisible: true, formValues }))}>
                    <Field name="toAddress" label="To Address" component={this.renderTextFieldComponent}/>
                    <Field name="amount" label="Amount" component={this.renderTextFieldComponent}/>
                    <Field name="currency" className="form-control" component="select">
                        {this.props.currencies.map(c => (
                            <option key={c.symbol} value={c.address}>{c.symbol}</option>
                        ))}
                    </Field>
                    <Field name="gasLimit" label="Gas Limit" component={this.renderTextFieldComponent}/>
                    <button type="submit" className="btn btn-primary">Generate transaction</button>
                </form>
                {this.renderConfirmTransactionModal()}
            </div>
        );
    }

    sendTransaction = () => {
        const values = this.state.formValues;

        const success = (tx) => {
            swal("Transaction sent", JSON.stringify(tx), "success")
        }

        const error = (err) => {
            swal("Transaction error", JSON.stringify(err), "error")
        }

        if(this.state.formValues.currency == 'ETH'){
            this.props.transferEther(this.props.web3, 
                values.toAddress, 
                this.props.accounts.selected, 
                values.amount, 
                values.gasLimit,
                success,
                error);
        }else{
            this.props.transferTokens(this.props.web3,
                values.currency, 
                values.toAddress, 
                this.props.accounts.selected, 
                values.amount, 
                values.gasLimit,
                success,
                error);
        }

        this.setState({ isConfirmModalVisible: false });
    }
}

function validate(values){
    const errors = {};

    if(!values.toAddress){
        errors.toAddress = 'Address is required';
    }

    if(!values.amount){
        errors.amount = 'Amount should be greater than zero';
    }

    if(!values.gasLimit){
        errors.gasLimit = 'Gas limit should be greater than zero';
    }

    return errors;
}

function mapStateToProps({web3, accounts, tokens }){
    const currencies = [{ symbol: 'ETH' }];
    return { 
        web3, 
        accounts,
        currencies: currencies.concat(_.filter(tokens, (t) => t.balance && t.balance !== "0"))
    };
}

export default reduxForm({
    form: 'NewTransaction',
    validate
})(connect(mapStateToProps, { transferEther })(NewTransaction));