import React, { Component } from 'react';
import Header from './header';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
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
                                    <input type="email" placeholder="you@yourmail.com" />
                                </p>

                                <p className="col-12">
                                    <label> Password </label>
                                    <input type="password" />
                                </p>
                                <p className="col-12">
                                    <button className="btn btn-info btn-block"> Login </button>
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