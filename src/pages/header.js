/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() { 
        return (
            <div>
                <Link> <a> Home </a></Link>
            </div>
        )
    }
}