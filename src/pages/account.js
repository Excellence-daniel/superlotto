import React, { Component } from 'react';
import Header from './header';
import {fireAuth, fireStore} from '../config/index';


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accoutBalance: 0,
            accountNumber: '',
            bankName: '',
            pin: '',
            amount: '', 
            newAmount : '5000'
        }
    }

    componentDidMount = async () => {
        const user = await fireAuth.auth().currentUser
        var closebtn = document.getElementById('closebtn');
        closebtn.disabled = true;
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

    saveTransaction = () => {
        var closebtn = document.getElementById('closebtn')
        var payBtn = document.getElementById('payBtn');
        const { amount, accountNumber, pin, bankName } = this.state;
        if (amount === '' || accountNumber === '' || pin === '' || bankName === '') {
            alert('Complete all field inputs');
        } else {
            if (accountNumber.length === 12 && accountNumber === '000000111111') {
                if (pin === '1220' & pin.length === 4) {
                    alert('Success Transaction');
                    var formerAmount = parseInt(this.state.newAmount);
                    var rechargedAmount = parseInt(amount);
                    var newAmount = formerAmount + rechargedAmount;
                    this.setState({newAmount})
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
        return (
            <div>
                <Header />
                <div className="container">
                    <h2>User Account Details</h2>
                    <div className="row card card-body">
                        <p className="col-12">
                            <label> Full Name </label>
                            <input type="text" disabled/>
                        </p>

                        <p className="col-12">
                            <label> Email </label>
                            <input type="email" disabled/>
                        </p>

                        <div className="row" style={{ fontSize: '20px', padding: '15px' }}>
                            <p className="col-12">
                                Account Balance (#) : <span>{this.state.newAmount}</span>

                                <button style={{ marginLeft: '10%' }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> Recharge Account </button>
                            </p>

                            <p className="col-12 col-md-6">
                                Wins : <span> 2</span>
                            </p>

                            <p className="col-12 col-md-6">
                                Wins (#) : <span> 2,000</span>
                            </p>

                            <p className="col-12 col-md-6">
                                Losses : <span> 4 </span>
                            </p>

                            <p className="col-12 col-md-6">
                                Losses (#) : <span> 5,000</span>
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
                                    <div class="modal-body">
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
                                            <button className="btn btn-success btn-block" onClick={this.saveTransaction} id = "payBtn"> Pay </button>
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