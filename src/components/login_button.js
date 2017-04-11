import React, { Component } from 'react';
import { Link } from 'react-router';

class LoginButton extends Component {
    goToLoginPage() {
        this.context.router.push('/login');
    }

    render() {
        return ( 
            <button 
                className="pull-xs-left btn btn-primary homeButton"
                onClick={this.goToLoginPage.bind(this)}>
                Login / Signup / Logout
            </button>
        )
    };
}

export default LoginButton;