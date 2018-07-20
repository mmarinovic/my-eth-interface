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
            <form onSubmit={handleSubmit(this.generateTransaction)}>
                <Field name="toAddress" label="To Address" component={this.renderFieldComponent}/>
                <Field name="amount" label="Amount" component={this.renderFieldComponent}/>
                <Field name="gasLimit" label="Gas Limit" component={this.renderFieldComponent}/>
                <button type="submit">Generate transaction</button>
            </form>
        );
    }

    generateTransaction = (values) => {
        console.log(values);
    }
}

function validateForm(values){
    const errors = {};
    return errors;
}

function mapStateToProps({web3}){
    return{web3};
}

export default reduxForm({
    validate: validateForm,
    form: 'NewTransaction'
})(connect(mapStateToProps)(NewTransaction));