import React, { Component } from 'react';
import Header from './header';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '', 
            password : '', 
            redirect : false
        }
    }

    render(){
        return (
            <div> 
                <Header />
                <div className = "container">
                <div className = "row">
                    <div className = "col-12 col-md-6">
                        Login
                    </div>
                    <div className = "col-12 col-md-6">
                    Picture
                    </div>
                </div>
                </div>
            </div>
        )
    }
}