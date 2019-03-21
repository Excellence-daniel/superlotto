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

                                <button style={{ marginLeft: '10%' }} className="btn btn-primary"> Recharge Account </button>
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


                    </div>
                </div>
            </div>
        )
    }
}