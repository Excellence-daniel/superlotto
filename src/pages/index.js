import React, { Component } from 'react';
import Header from './header';


export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <img alt = "SuperLotto Img" class = "img-fluid" style = {{width : '100%'}} src="https://superlottong.com/Content/assets/superlotto/img/web_banner1.jpg" />
            </div>
        )
    }
}