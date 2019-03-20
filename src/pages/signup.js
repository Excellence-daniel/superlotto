import React, { Component } from 'react';
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
            dateofbirth: ''
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

    handleConfirmPassword = (e) => {
        var signupBtn = document.getElementById('signupBtn')
        if (e.target.value) {
            if (e.target.value !== this.state.password) {
                console.log("Wrong Password");
                signupBtn.disabled = true;
            } else {
                signupBtn.disabled = false;
            }
        }
    }

    signUp = async () => {
        const { firstname, lastname, email, password, dateofbirth, address, phonenumber } = this.state;
        if (firstname === '' || lastname === '' || email === '' || password === '' || dateofbirth === '' || address === '' || phonenumber === '') {
            console.log('Complete all fields');
        } else {
            try {
                // const getUserQuery = await fireStore.collection('Users').where('Email', '===', email).get();
                // if (getUserQuery.empty) {
                    await fireAuth.auth().createUserWithEmailAndPassword(email, password)
                    await fireStore.collection('Users').add({
                        Name: firstname + ' ' + lastname,
                        Email: email,
                        BirthDay: dateofbirth,
                        Address: address,
                        PhoneNumber: phonenumber,
                        Password: password,
                        UserToken: ''
                    })
                    console.log('Created')
                // } else {
                //     console.log('A user exists with this email. Please use a unique email address')
                // }
            }
            catch (err) {
                console.log(err.message);
                alert('Error.' + err.message);
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container mt-4">
                    <center><h1> Sign Up Form </h1></center>
                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> First Name </label>
                            <input onChange={this.handleFirstNameInput} type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Last Name </label>
                            <input onChange={this.handleLastNameInput} type="text" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Address </label>
                            <input onChange={this.handleAddressInput} type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Email </label>
                            <input onChange={this.handleEmailInput} type="email" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Phone Number </label>
                            <input onChange={this.handlePhoneNumberInput} type="text" />
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Date of Birth </label>
                            <input onChange={this.handleDateOfBirthInput} type="date" />
                        </p>
                    </div>

                    <div className="row">
                        <p className="col-12 col-md-6">
                            <label> Password </label>
                            <input onChange={this.handlePasswordInput} type="password" />

                            <p>
                                <b> Password Strength </b>
                                <li> More than 6 characters </li>
                                <li> Must have a numeric character </li>
                                <li> Must have a special character </li>
                            </p>
                        </p>

                        <p className="col-12 col-md-6">
                            <label> Confirm Password </label>
                            <input onChange={this.handleConfirmPassword} type="password" />
                        </p>
                    </div>

                    <div className="row">
                        <p>
                            <label>
                                <input type="checkbox" />
                                <span> I am above 18 years of age and I accept the Terms and Conditions.</span>
                            </label>
                        </p>
                    </div>
                    <button className="btn btn-success btn-block" id="signupBtn" onClick={this.signUp}> SIGN UP </button>

                </div>
            </div>
        )
    }
}