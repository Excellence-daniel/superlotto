import React, { Component } from 'react';
import Header from './header';
import { fireAuth } from '../config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    handleEmailInput = (e) => {
        if (e.target.value){
            this.setState({email : e.target.value});
        }
    }

    handlePassWordInput = (e) => {
        if (e.target.value){
            this.setState({password : e.target.value});
        }
    }

    handleLogin = async () => {
        const {email, password} = this.state;
        if (email === '' || password === ''){
            alert('Complete all fields')
        } else {
            await fireAuth.auth().signInWithEmailAndPassword(email, password)
            console.log('logged in')
            var user = await fireAuth.auth().currentUser;
            console.log(user)
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 mt-4">
                            <center><h2> Login Form </h2></center>
                            <div className="row">
                                <p className="col-12">
                                    <label> Email Address </label>
                                    <input onChange = {this.handleEmailInput} type="email" placeholder="you@yourmail.com" />
                                </p>

                                <p className="col-12">
                                    <label> Password </label>
                                    <input onChange = {this.handlePassWordInput} type="password" />
                                </p>
                                <p className="col-12">
                                    <button onClick = {this.handleLogin} className="btn btn-info btn-block"> Login </button>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            Picture
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}