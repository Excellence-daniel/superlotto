import React, { Component } from 'react';
import Header from './header';
import {fireAuth} from '../config/index';

export default class App extends Component {

    componentDidMount = async () => {
        const user = await fireAuth.auth().currentUser;
        if (user) {
            localStorage.setItem('UserLoggedIn', true);
        } else {
            localStorage.removeItem('UserLoggedIn');
        }
    }

    render() {
        return (
            <div>
                <Header />
                <img alt = "SuperLotto Img" class = "img-fluid" style = {{width : '100%'}} src="img/lotto-win.jpg" />
            </div>
        )
    }
}