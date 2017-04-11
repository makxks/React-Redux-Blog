import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LoginButton extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    goToLoginPage() {
        this.context.router.push('/auth/login');
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