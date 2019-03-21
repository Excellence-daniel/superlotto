import React, { Component } from 'react';
import Header from './header';


export default class Account extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h2>User Account Details</h2>
                    <div className="row card card-body">
                        <p className="col-12">
                            <label> Full Name </label>
                            <input type="text" />
                        </p>

                        <p className="col-12">
                            <label> Email </label>
                            <input type="email" />
                        </p>

                        <div className="row" style={{ fontSize: '20px', padding: '15px' }}>
                            <p className="col-12">
                                Account Balance (#) : <span> 2,000</span>

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

                            <button className="btn btn-primary btn-block"> Update Account Details </button>
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
                                            <input type="number" placeholder="5039XXXXXXXXXXXXX09" />
                                        </p>

                                        <p className="col-12">
                                            <label> Select Bank  </label>
                                            <select>
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
                                                <option value="Savings"> Savings </option>
                                                <option value="Current"> Current </option>
                                            </select>
                                        </p>

                                        <p className="col-12">
                                            <label> Amount </label>
                                            <input type = "number"/>
                                        </p>

                                        <p className = "col-12">
                                            <label> Pin </label> 
                                            <input type = "password" placeholder = "xxxx"/>
                                        </p>

                                        <p className = "col-12">
                                            <button className = "btn btn-success btn-block"> Pay </button>
                                        </p>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
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