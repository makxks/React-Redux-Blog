import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Auth extends Component {
    constructor(props){
        super(props);

        state = { window:"login" };
    }

    renderSignInOut() {
        if(firebase.auth().currentUser){
            return (
                <li onClick={this.setState({window:"logout"})}>Logout</li>
            )
        }
        else {
            return (
                <li onClick={this.setState({window:"login"})}>Login</li>
            )
        }
    }

    renderAuth() {
        /*if(this.state.window == "signup"){
            return (
                <SignupForm />
            )
        }
        else if(this.state.window == "login"){
            return (
                <LoginForm />
            )
        }
        else if(this.state.window == "logout"){
            return (
                <div>
                    <h3>Are you sure you want to logout?</h3>
                    <button onClick={firebase.auth().signout()} className="btn btn-danger">Logout</button>
                </div>
            )
        }*/
    }

    render() {
        <div class="authComponentsContainer">
            <header>
                <nav class="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
                    <ul class="nav nav-tabs">
                        <li onClick={this.setState({window:"signup"})}>Signup</li>
                        {this.renderSignInOut.bind(this)}
                    </ul>
                </nav>
            </header>
        </div>
    }
}