import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class ConfirmEmail extends Component {
    render() {
        if (this.state.redirect){
            return <Redirect to = "/login"/>
        }
        return (
            <div>

            </div>
        )
    }
}