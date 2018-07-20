import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect, sub } from 'react-redux';

class NewTransaction extends Component {

    renderFieldComponent = (field) => {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
            </div>
        )
    }

    render(){
        const { handleSubmit } = this.props
        return (
            <div>
                <h1>Send Ether and Token</h1>
                <form onSubmit={handleSubmit(this.generateTransaction)}>
                    <Field name="toAddress" label="To Address" component={this.renderFieldComponent}/>
                    <Field name="amount" label="Amount" component={this.renderFieldComponent}/>
                    <Field name="gasLimit" label="Gas Limit" component={this.renderFieldComponent}/>
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
    return errors;
}

function mapStateToProps({web3, currentAccount}){
    return { web3, currentAccount };
}

export default reduxForm({
    form: 'NewTransaction',
    validate
})(connect(mapStateToProps)(NewTransaction));