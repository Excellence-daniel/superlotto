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
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = true;
        loginBtn.innerHTML = `<img src = 'img/loader.gif' alt = 'loader' style= 'width:5%'/>`;
        const { email, password } = this.state;
        if (email === '' || password === '') {
            alert('Complete all fields')
            loginBtn.innerText = 'Login';
            loginBtn.disabled = false;
        } else {
            if (validator.isEmail(email)){
                try {
                    await fireAuth.auth().signInWithEmailAndPassword(email, password)
                    const getUserQuery = await fireStore.collection('Users').where('Email', '==', email).get();
                    if (getUserQuery.docs[0].data().EmailVerified){
                        const user = await fireAuth.auth().currentUser;
                        const getUserData = await fireStore.collection('Users').where('Email', '==', user.email).get()
                        const userName = getUserData.docs[0].data().Name;
                        localStorage.setItem('UserName', userName);
                        localStorage.setItem('UserLoggedIn' , true);
                        alert('Login Successful');
                        this.setState({redirect : true})
                        console.log(user);
                        console.log('Logged in');
                    } else {
                        alert('You cannot login until you verify your email.')
                        await fireAuth.auth().signOut();
                        localStorage.removeItem('UserLoggedIn');
                        console.log('Not logged in')
                        loginBtn.innerText = 'Login';
                        loginBtn.disabled = false;
                    }
                }
                catch (err) {
                    console.log(err.message);
                    alert(err.message);
                    loginBtn.innerText = 'Login';
                    loginBtn.disabled = false;
                }
            } else {
                alert('Email Format Wrong! Enter Valid Email')
                loginBtn.innerText = 'Login';
                loginBtn.disabled = false;
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
                        <div className="col-12 col-md-4 mt-5">
                            <center><h2> Login Form </h2></center>
                            <div className="row">
                                <p className="col-12">
                                    <label> Email Address </label>
                                    <input onChange={this.handleEmailInput} className = "form-control" type="email" placeholder="you@yourmail.com" />
                                </p>

                                <p className="col-12">
                                    <label> Password </label>
                                    <input onChange={this.handlePassWordInput} className = "form-control" type="password" />
                                </p>
                                <p className="col-12">
                                    <button onClick={this.handleLogin} id = 'loginBtn' className="btn btn-info btn-block"> Login </button>
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-8">
                            <img src="img/winning.jpg" style = {{width : '100%'}} className = "img-fluid"/>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}