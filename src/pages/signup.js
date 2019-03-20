import React, { Component } from 'react';
import Header from './header';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className = "container-fluid mt-4" style = {{background : '#cdeffb'}}>
                    <center><h1> Sign Up Form </h1></center>
                    <div className = "row">
                        <div className = "col-6">
                            <p>
                                <label> First Name </label>
                                <input type = "text"/>
                            </p>
                        </div>

                        <div className = "col-6">
                        <p>
                            <label> Last Name </label>
                            <input type = "text"/>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}