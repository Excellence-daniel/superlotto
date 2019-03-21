/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Header from './header';
import { fireAuth, fireStore } from '../config';
import validator from 'validator';
import {Redirect} from 'react-router-dom';

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
        if (e.target.value) {
            this.setState({ email: e.target.value });
        }
    }

    handlePassWordInput = (e) => {
        if (e.target.value) {
            this.setState({ password: e.target.value });
        }
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        if (email === '' || password === '') {
            alert('Complete all fields')
        } else {
            if (validator.isEmail(email)){
                try {
                    await fireAuth.auth().signInWithEmailAndPassword(email, password)
                    const getUserQuery = await fireStore.collection('Users').where('Email', '==', email).get();
                    if (getUserQuery.docs[0].data().EmailVerified){
                        var user = await fireAuth.auth().currentUser;
                        localStorage.setItem('UserLoggedIn' , true);
                        alert('logged in')
                        this.setState({redirect : true})
                        console.log(user);
                        console.log('Logged in')
                    } else {
                        alert('You cannot login until you verify your email.')
                        await fireAuth.auth().signOut();
                        localStorage.removeItem('UserLoggedIn');
                        console.log('Not logged in')
                    }
                }
                catch (err) {
                    console.log(err.message);
                    alert(err.message);
                }
            } else {
                alert('Email Format Wrong! Enter Valid Email')
            }
        }
    }
    render() {
        if (this.state.redirect === true){
            return <Redirect to = '/'/>
        }
        return (
            <div>
                <Header />
                <div className="container-fluid mt-6">
                    <div className="row">
                        <div className="col-12 col-md-6 mt-5">
                            <center><h2> Login Form </h2></center>
                            <div className="row">
                                <p className="col-12">
                                    <label> Email Address </label>
                                    <input onChange={this.handleEmailInput} type="email" placeholder="you@yourmail.com" />
                                </p>

                                <p className="col-12">
                                    <label> Password </label>
                                    <input onChange={this.handlePassWordInput} type="password" />
                                </p>
                                <p className="col-12">
                                    <button onClick={this.handleLogin} className="btn btn-info btn-block"> Login </button>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <img src="https://superlottong.com/Content/assets/superlotto/img/web_banner1.jpg" style = {{width : '100%'}} className = "img-fluid"/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}