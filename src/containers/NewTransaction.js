import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

class NewTransaction extends Component {

    renderTextFieldComponent = (field) => {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-danger">
                    {field.meta.touched? field.meta.error : ''}
                </div>
            </div>
        )
    }

    render(){
        const { handleSubmit } = this.props
        return (
            <div>
                <h1>Send Ether and Token</h1>
                <form onSubmit={handleSubmit(this.generateTransaction)}>
                    <Field name="toAddress" label="To Address" component={this.renderTextFieldComponent}/>
                    <Field name="amount" label="Amount" component={this.renderTextFieldComponent}/>
                    <Field name="gasLimit" label="Gas Limit" component={this.renderTextFieldComponent}/>
                    <button type="submit" className="btn btn-primary">Generate transaction</button>
                </form>
            </div>
        );
    }

    generateTransaction = (values) => {
        console.log(values);
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

function mapStateToProps({web3, currentAccount}){
    return { web3, currentAccount };
}

export default reduxForm({
    form: 'NewTransaction',
    validate
})(connect(mapStateToProps)(NewTransaction));