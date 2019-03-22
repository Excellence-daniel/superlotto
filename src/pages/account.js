import React, { Component } from 'react';
import Header from './header';
import { fireAuth, fireStore } from '../config/index';
import { Redirect } from 'react-router-dom';


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBalance: '0',
            accountNumber: '',
            bankName: '',
            pin: '',
            amount: '',
            newAmount: '',
            redirect: false,
            userName: '',
            userEmail: '',
            wins: 0,
            winsCash: 0,
            losses: 0,
            lossesCash: 0,
            userId : ''
        }
    }

    componentDidMount = async () => {
        var closebtn = document.getElementById('closebtn');
        closebtn.disabled = true;
        const user = await fireAuth.auth().currentUser;
        if (user) {
            var email = user.email;
            console.log(email)
            const getUserWithEmail = await fireStore.collection('Accounts').where('Email', '==', email).get();
            if (!(getUserWithEmail.empty)) {
                const userId = getUserWithEmail.docs[0].id;
                const userData = getUserWithEmail.docs[0].data();
                console.log(userData);
                this.setState({
                    userName: userData.Name, userEmail: userData.Email, wins: userData.Wins, winsCash: userData.WinsCash,
                    losses: userData.Losses, lossesCash: userData.LossesCash, accountBalance: userData.AccountBalance, userId
                });
            } else {
                alert('User does not exist');
                this.setState({ redirect: true })
            }
        } else {
            alert('Login to access this page')
            this.setState({ redirect: true })
        }
    }

    handleAccountNumber = (e) => {
        if (e.target.value) {
            this.setState({ accountNumber: e.target.value.trim() });
        }
    }

    handleBankNameSelect = (e) => {
        if (e.target.value) {
            this.setState({ bankName: e.target.value.trim() });
        }
    }

    handlePinInput = (e) => {
        if (e.target.value) {
            this.setState({ pin: e.target.value.trim() })
        }
    }

    handleAmountInput = (e) => {
        if (e.target.value) {
            this.setState({ amount: e.target.value.trim() })
        }
    }

    saveTransaction = async () => {
        var closebtn = document.getElementById('closebtn')
        var payBtn = document.getElementById('payBtn');
        var modalBody = document.getElementById('modal-body')
        const { amount, accountNumber, pin, bankName } = this.state;
        if (amount === '' || accountNumber === '' || pin === '' || bankName === '') {
            alert('Complete all field inputs');
        } else {
            if (accountNumber.length === 12 && accountNumber === '000000111111') {
                if (pin === '1220' & pin.length === 4) {
                    var formerAmount = parseInt(this.state.accountBalance);
                    var rechargedAmount = parseInt(amount);
                    var newAmount = formerAmount + rechargedAmount;
                    this.setState({ accountBalance : newAmount })
                    await fireStore.collection('Accounts').doc(this.state.userId).update({
                        AccountBalance : newAmount
                    })
                    var success = `<center><img src = 'img/success.png' style = "width : 60%" class = 'img-fluid'/> <br/><br/> <h4> Successful Transaction </h4></center>`
                    modalBody.innerHTML = success
                    closebtn.disabled = false;
                    payBtn.disabled = true;
                } else {
                    alert('Wrong Pin.')
                }
            } else {
                alert('Invalid Account Number!')
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Header />
                <div className="container">
                    <h2>User Account Details</h2>
                    <div className="row card card-body">
                        <p className="col-12">
                            <label> Full Name </label>
                            <input type="text" value = {this.state.userName} disabled />
                        </p>

                        <p className="col-12">
                            <label> Email </label>
                            <input type="email" value = {this.state.userEmail} disabled />
                        </p>

                        <div className="row" style={{ fontSize: '20px', padding: '15px' }}>
                            <p className="col-12">
                                Account Balance (#) : <span> {this.state.accountBalance} </span>

                                <button style={{ marginLeft: '10%' }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> Recharge Account </button>
                            </p>

                            <p className="col-12 col-md-6">
                                Wins : <span> {this.state.wins} </span>
                            </p>

                            <p className="col-12 col-md-6">
                                Wins (#) : <span>{this.state.winsCash}</span>
                            </p>

                            <p className="col-12 col-md-6">
                                Losses : <span> {this.state.losses} </span>
                            </p>

                            <p className="col-12 col-md-6">
                                Losses (#) : <span> {this.state.lossesCash} </span>
                            </p>
                        </div>

                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalCenterTitle"> Recharge Your Account </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" id = "modal-body">
                                        <p className="col-12">
                                            <label> Account Number </label>
                                            <input onChange={this.handleAccountNumber} type="number" placeholder="5039XXXXXXXXXXXXX09" />
                                        </p>

                                        <p className="col-12">
                                            <label> Select Bank  </label>
                                            <select onChange={this.handleBankNameSelect}>
                                                <option value="" disabled selected> Select Bank  </option>
                                                <option value="Access Bank"> Access Bank </option>
                                                <option value="Skye Bank"> Skye Bank </option>
                                                <option value="Sterling Bank"> Sterling Bank </option>
                                                <option value="FCMB"> FCMB </option>
                                                <option value="Guaranty Trust Bank"> Guaranty Trust Bank </option>
                                                <option value="Zenith Bank"> Zenith Bank </option>
                                            </select>
                                        </p>

                                        <p className="col-12">
                                            <label> Select Account Type </label>
                                            <select>
                                                <option value="" disabled selected> Select Account Type  </option>
                                                <option value="Savings"> Savings </option>
                                                <option value="Current"> Current </option>
                                            </select>
                                        </p>

                                        <p className="col-12">
                                            <label> Amount </label>
                                            <input onChange={this.handleAmountInput} type="number" />
                                        </p>

                                        <p className="col-12">
                                            <label> Pin </label>
                                            <input onChange={this.handlePinInput} id="pin" type="password" placeholder="xxxx" />
                                        </p>

                                        <p className="col-12">
                                            <button className="btn btn-success btn-block" onClick={this.saveTransaction} id="payBtn"> Pay </button>
                                        </p>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" id="closebtn" data-dismiss="modal">Close</button>
                                        {/* <button type="button" class="btn btn-primary" id = "savebtn" onClick={this.saveTransaction}>Save Transaction</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}