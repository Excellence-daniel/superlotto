import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {parse} from 'query-string';
import {fireStore} from '../config/index';

export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    componentDidMount = async () => {
        const getURL = parse(this.props.location.search);
        const userToken = getURL.UT;
        let userDocID;
        if (userToken){
            const getUser = await fireStore.collection('Users').where('UserToken', '==', userToken).get();
            const isEmailVerified = getUser.docs[0].data().EmailVerified;
            userDocID = getUser.docs[0].id;
            if (isEmailVerified){
                alert('Email Verified already.')
            } else {
                await fireStore.collection('Users').doc(userDocID).update({
                    EmailVerified : true
                });
                alert('Email Verification Successful');
                this.window.close();
            }
        }
        // console.log(getURL);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
        return (
            <div>

            </div>
        )
    }
}