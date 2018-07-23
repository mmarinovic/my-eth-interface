import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { MyFormModal } from '../components/MyModal';
import { addToken } from '../actions/tokenActions';

class NewToken extends Component {

    state = {
        show: false
    }

    render(){
        const { handleSubmit } = this.props;
        const modalBody = (
            <div>
                <div className="form-group">
                    <label>Symbol</label>
                    <Field className="form-control" name="symbol" component="input" />
                </div>
                <div className="form-group">
                    <label>Contract address</label>
                    <Field className="form-control" name="contractAddress" component="input" />
                </div>
            </div>
        );

        const modalFooter = (
            <div>
                <button className="btn btn-danger" onClick={() => this.setState({ show: false })}>Cancel</button>
                <button className="btn btn-primary" type="submit">Add</button>
            </div>
        );

        return (
            <div>
                <button className="btn btn-primary" onClick={() => this.setState({ show: true })}>Add token</button>
                <MyFormModal
                    show={this.state.show}
                    onSubmit={handleSubmit(this.addNewToken)}
                    title="Add Token"
                    body={modalBody}
                    footer={modalFooter}
                />
            </div>
        )
    }

    addNewToken = (values) => {
        this.props.addToken(values.symbol, values.contractAddress);
        this.setState({ show: false });
    }
}

function validate(values){
    const errors = {};
    
    if(!values.symbol){
        errors.symbol = "Symbol is required"
    }

    if(!values.symbol){
        errors.contractAddress = "Contract Address is required"
    }

    return errors;
}

export default reduxForm({
    form: 'NewToken',
    validate
})(connect(null, { addToken })(NewToken));