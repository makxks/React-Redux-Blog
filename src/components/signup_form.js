import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

class SignupForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
            .then((data) => {
                firebase.database().ref('users/' + data.uid).set({
                    username: props.username,
                    email: props.email
                })
                .then(() => {
                this.context.router.push('/');
                })
            });   
    }

    signupForm(){
        const { fields: { email, username, password, passwordConfirm }, handleSubmit } = this.props;
   
        return (
        <div className="commentInput">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                <h5>Signup</h5>
                <div className={`form-group commentInput ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                    <input type="email" className="form-control commentInput" {...email} />
                    <label>Your email</label>
                    <div className="text-help">
                        {email.touched ? email.error : ''}
                    </div>
                </div>
                <div className={`form-group commentInput ${username.touched && username.invalid ? 'has-danger' : ''}`}>
                    <input type="text" className="form-control commentInput" {...username} />
                    <label>Choose a username</label>
                    <div className="text-help">
                        {username.touched ? username.error : ''}
                    </div>
                </div>
                <div className={`form-group commentInput ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                    <input type="password" className="form-control commentInput" {...password} />
                    <label>Enter a new password</label>
                    <div className="text-help">
                        {password.touched ? password.error : ''}
                    </div>
                </div>
                <div className={`form-group commentInput ${passwordConfirm.touched && passwordConfirm.invalid ? 'has-danger' : ''}`}>
                    <input type="password" className="form-control commentInput" {...passwordConfirm} />
                    <label>Reenter your password</label>
                    <div className="text-help">
                        {passwordConfirm.touched ? passwordConfirm.error : ''}
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
                {this.signupForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter your email';
    }

    if (!values.username) {
        errors.username = 'Enter a username';
    }

    if (!values.password) {
        errors.password = 'Enter a new password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Reenter the password';
    }
    else if(values.password !== values.passwordConfirm){
        errors.passwordConfirm = "The passwords don't match";
    }

    return errors;
}

export default reduxForm({
    form: 'SignupForm',
    fields: ['email', 'username', 'password', 'passwordConfirm'],
    validate
}, null)(SignupForm);