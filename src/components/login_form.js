import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class LoginForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        firebase.auth().signInWithEmailAndPassword(props.email, props.password);
        this.context.router.push('/');
    }

    loginForm(){
        const { fields: { email, password }, handleSubmit } = this.props;

        return (
        <div className="commentInput">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                <h5>Login</h5>
                <div className={`form-group commentInput ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                    <input type="email" className="form-control commentInput" {...email} />
                    <label>Your email</label>
                    <div className="text-help">
                        {email.touched ? email.error : ''}
                    </div>
                </div>
                <div className={`form-group commentInput ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                    <input type="password" className="form-control commentInput" {...password} />
                    <label>Password</label>
                    <div className="text-help">
                        {password.touched ? password.error : ''}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        );
        
    }

    render() {
        return (
            <div className="commentInput">
                {this.loginForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter an email';
    }

    if (!values.author) {
        errors.password = 'Enter your password';
    }

    return errors;
}

export default reduxForm({
    form: 'LoginForm',
    fields: ['password', 'email'],
    validate
}, null)(LoginForm);