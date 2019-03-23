import React, { Component } from 'react';
import validator from 'validator';
import uuid from 'uuid';
import { Redirect } from 'react-router-dom';
import Header from './header';
import { fireAuth, fireStore } from '../config/index';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            password: '',
            dateofbirth: '',
            redirect: false
        }
    }

    handleFirstNameInput = (e) => {
        if (e.target.value) {
            this.setState({ firstname: e.target.value.trim() });
        }
    }

    handleLastNameInput = (e) => {
        if (e.target.value) {
            this.setState({ lastname: e.target.value.trim() });
        }
    }

    handleEmailInput = (e) => {
        if (e.target.value) {
            this.setState({ email: e.target.value.trim() });
        }
    }

    handleAddressInput = (e) => {
        if (e.target.value) {
            this.setState({ address: e.target.value.trim() });
        }
    }

    handlePhoneNumberInput = (e) => {
        if (e.target.value) {
            this.setState({ phonenumber: e.target.value.trim() });
        }
    }

    handleDateOfBirthInput = (e) => {
        if (e.target.value) {
            this.setState({ dateofbirth: e.target.value.trim() });
        }
    }

    handlePasswordInput = (e) => {
        if (e.target.value) {
            this.setState({ password: e.target.value.trim() });
        }
    }

    signUp = async () => {
        const signupBtn = document.getElementById('signupBtn');
        signupBtn.disabled = true;
        signupBtn.innerHTML = `<img src = 'img/loader.gif' className = 'img-fluid' alt = 'loader' style= 'width:5%'/>`;
        const { firstname, lastname, email, password, dateofbirth, address, phonenumber } = this.state;
        if (firstname === '' || lastname === '' || email === '' || password === '' || dateofbirth === '' || address === '' || phonenumber === '') {
            console.log('Complete all fields');
            alert('Complete all fields');
            signupBtn.innerText = 'Sign Up';
            signupBtn.disabled = false;
        } else {
            if (validator.isEmail(email)) {
                const userToken = uuid.v4();
                try {
                    await fireAuth.auth().createUserWithEmailAndPassword(email, password)
                    await fireStore.collection('Users').add({
                        Name: firstname + ' ' + lastname,
                        Email: email,
                        BirthDay: dateofbirth,
                        Address: address,
                        PhoneNumber: phonenumber,
                        Password: password,
                        UserToken: userToken,
                        EmailVerified: false
                    })
                    await fireStore.collection('Accounts').add({
                        Name: firstname + ' ' + lastname,
                        Email: email,
                        AccountBalance: 0,
                        Wins: 0,
                        WinsCash: 0,
                        Losses: 0,
                        LossesCash: 0,
                        UserToken: userToken
                    })
                    await fireAuth.auth().signOut();
                    console.log('Success!')
                    alert('An account has been created for you. Verfiy your email to login.')
                    this.setState({ redirect: true })
                }
                catch (err) {
                    console.log(err.message);
                    alert('Error.' + err.message);
                    signupBtn.innerText = 'Sign Up';
                    signupBtn.disabled = false;
                }
            } else {
                alert('Invalid Email. Use a correct email');
                signupBtn.innerText = 'Sign Up';
                signupBtn.disabled = false;
            }
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <Header />
                <div className="container">
                    <center><h1> Sign Up Form </h1></center>
                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> First Name </label>
                            <input onChange={this.handleFirstNameInput} className="form-control" type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Last Name </label>
                            <input onChange={this.handleLastNameInput} className="form-control" type="text" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Address </label>
                            <input onChange={this.handleAddressInput} className="form-control" type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Email </label>
                            <input onChange={this.handleEmailInput} className="form-control" placeholder="you@yourmail.com" type="email" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Phone Number </label>
                            <input onChange={this.handlePhoneNumberInput} className="form-control" type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Date of Birth </label>
                            <input onChange={this.handleDateOfBirthInput} className="form-control" type="date" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Password </label>
                            <input onChange={this.handlePasswordInput} className="form-control" type="password" />
                        </p>
                    </div>

                    <div className="row">
                        <p classname = "col-12">
                            <input type="checkbox" />
                            <span> I am above 18 years of age and I accept the Terms and Conditions.</span>
                        </p>
                    </div>
                    <button className="btn btn-success btn-block" id="signupBtn" onClick={this.signUp}> Sign Up </button>

                </div>
            </div>
        )
    }
}