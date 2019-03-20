/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                {/* //for small screens */}
                <nav class="navbar nav-style navbar-expand-lg for-large">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div class="col-3">
                            <center>
                                <a class="navbar-brand" href="#"> <img src="https://superlottong.com/Content/assets/superlotto/img/logo.png" alt="logo" class="img-fluid" /> </a>
                            </center>
                        </div>
                        <div class="col-2"></div>
                        <div class="col-7">
                            <div class="col-12" style={{ float: 'right' }}>
                                <p style={{ float: 'right' }}>
                                    <button class="btn btn-primary btn-fontsize-18"> Login </button>

                                    <Link to="/signup">
                                        <button class="btn btn-primary btn-fontsize-18"> SignUp </button>
                                    </Link>
                                </p>
                            </div>
                            <div class="col-12 mt-3">
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style={{ float: 'right' }}>
                                    <li class="nav-item" disabled>
                                        <Link>
                                            <a> Account </a>
                                        </Link>
                                    </li>

                                    <li class="nav-item active">
                                        <Link>
                                            <a> Play Game  </a>
                                        </Link>
                                    </li>

                                    <li class="nav-item active">
                                        <Link>
                                            <a> Check Results </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* for large screen // */}

                {/* //for small screens */}
                <nav class="navbar navbar-expand-lg navbar-light for-small">
                    <center>
                        <a class="navbar-brand" href="#"> <img src="https://superlottong.com/Content/assets/superlotto/img/logo.png" alt="logo" class="img-fluid" /> </a>
                    </center>
                    <button class="navbar-toggler dropdown-btn-tog" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <center>
                            <div class="col-12">
                                <p>
                                    <button class="btn btn-primary btn-fontsize-18"> Login </button>

                                    <Link to="/signup">
                                        <button class="btn btn-primary btn-fontsize-18"> SignUp </button>
                                    </Link>
                                </p>
                            </div>
                            <div class="col-12 mt-3">
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li class="nav-item" disabled>
                                        <Link>
                                            <a> Account </a>
                                        </Link>
                                    </li>

                                    <li class="nav-item mt-2 active">
                                        <Link>
                                            <a> Play Game  </a>
                                        </Link>
                                    </li>

                                    <li class="nav-item mt-2 active">
                                        <Link>
                                            <a> Check Results </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </center>
                    </div>
                </nav>
                {/* for small screens// */}

            </div>
        )
    }
}