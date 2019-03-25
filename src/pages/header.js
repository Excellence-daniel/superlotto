/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fireAuth } from '../config/index';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            redirect: false
        }
    }
    componentDidMount = async () => {
        const user = await fireAuth.auth().currentUser
        if (user) {
            localStorage.setItem('UserLoggedIn', true);
            this.setState({ username: localStorage.getItem('UserName') })
        } else {
            // this.setState({redirect : true})
            fireAuth.auth().signOut();
            localStorage.removeItem('UserLoggedIn');
        }
    }

    logOut = async () => {
        try {
            await fireAuth.auth().signOut();
            localStorage.removeItem('UserLoggedIn');
            alert('Logged Out!');
            window.location.reload();
        }
        catch (err) {
            alert('Error' + err.message);
            console.log(err.message);
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }

        let userLoggedIn;
        if (localStorage.getItem('UserLoggedIn')) {
            userLoggedIn = localStorage.getItem('UserLoggedIn');
        } else {
            userLoggedIn = false;
        }

        if (userLoggedIn) {
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
                                    <Link to="/">
                                        <a class="navbar-brand">
                                            <img src="img/lotto-logo.png" alt="logo" class="img-fluid" style={{ width: '60%' }} />
                                        </a>
                                    </Link>
                                </center>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-7">
                                <div class="col-12" style={{ float: 'right' }}>
                                    <p className = "row" style={{ float: 'right' }}>

                                        <p className="col-2" style={{ marginRight: '0px', marginLeft: '0px' }}>
                                            <i class="far fa-user-circle" style={{ fontSize: '27px' }}></i>
                                        </p>
                                        <p className="col-10" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                            <h4> {this.state.username} </h4>
                                        </p>

                                    </p>
                                </div>

                                <div class="col-12 mt-3">
                                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style={{ float: 'right' }}>
                                        <li class="nav-item" disabled>
                                            <Link to="/account">
                                                <a> Account </a>
                                            </Link>
                                        </li>

                                        <li class="nav-item active">
                                            <Link to="/lotto">
                                                <a> Play Game  </a>
                                            </Link>
                                        </li>

                                        <li class="nav-item active">
                                            <Link to="/checkResults">
                                                <a> Check Results </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={this.logOut} className="btn btn-danger"> Log Out</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* for large screen // */}

                    {/* //for small screens */}
                    <nav class="navbar navbar-expand-lg navbar-light for-small">
                        <div class="row">
                            <div class="col-9">
                                <Link to="/">
                                    <a class="navbar-brand">
                                        <img src="http://woodphoriaky.com/wp-content/uploads/2018/05/logo-designer-com-png-logo-design-transparent-logo-design-images-pluspng-template.png" alt="logo" class="img-fluid" style={{ width: '70%' }} />
                                    </a>
                                </Link>
                            </div>
                            <div class="col-3" style={{ marginTop: '10%' }}>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>


                        <div class="collapse navbar-collapse" id="navbarNav">
                            <div class="row">
                                <div class='col-4'></div>
                                <div class='col-4'>
                                    <center>
                                        <p className ="row">
                                            <p className="col-2" style={{ marginRight: '0px', marginLeft: '0px' }}>
                                                <i class="far fa-user-circle" style={{ fontSize: '27px' }}></i>
                                            </p>
                                            <p className="col-10" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                                <h4> {this.state.username} </h4>
                                            </p>

                                        </p>
                                        <ul class="navbar-nav mr-auto mt-lg-0">
                                            <li class="nav-item">
                                                <Link to="/account">
                                                    <a> Account </a>
                                                </Link>
                                            </li>

                                            <li class="nav-item mt-2 active">
                                                <Link to="/lotto">
                                                    <a> Play Game  </a>
                                                </Link>
                                            </li>

                                            <li class="nav-item mt-2 active">
                                                <Link to="/checkResults">
                                                    <a> Check Results </a>
                                                </Link>
                                            </li>

                                            <li class="nav-item mt-2 active">
                                                <button onClick={this.logOut} className="btn btn-danger"> Log Out </button>
                                            </li>
                                        </ul>
                                    </center>
                                </div>
                                <div class='col-4'></div>
                            </div>
                        </div>
                    </nav>
                    {/* for small screens// */}
                </div>
            )
        } else {
            return (
                <div>
                    {/* //for small screens */}
                    <nav class="navbar nav-style navbar-expand-lg for-large">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <div class="col-3">
                                <Link to="/">
                                    <a class="navbar-brand">
                                        <img src="img/lotto-logo.png" alt="logo" class="img-fluid" style={{ width: '60%' }} />
                                    </a>
                                </Link>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-7">
                                <div class="col-12" style={{ float: 'right' }}>
                                    <p style={{ float: 'right' }}>
                                        <Link to="/login">
                                            <button class="btn btn-primary btn-fontsize-18"> Login </button>
                                        </Link>

                                        <Link to="/signup">
                                            <button class="btn btn-primary btn-fontsize-18"> SignUp </button>
                                        </Link>
                                    </p>
                                </div>
                                <div class="col-12 mt-3">
                                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style={{ float: 'right' }}>
                                        <li class="nav-item active">
                                            <Link to="/lotto">
                                                <a> Play Game  </a>
                                            </Link>
                                        </li>

                                        <li class="nav-item active">
                                            <Link to="/checkResults">
                                                <a> Check Results </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* for large screen // */}

                    {/* for small screens */}
                    <nav class="navbar navbar-expand-lg navbar-light for-small">
                        <div class="row">
                            <div class="col-9">
                                <Link to="/">
                                    <a class="navbar-brand">
                                        <img src="http://woodphoriaky.com/wp-content/uploads/2018/05/logo-designer-com-png-logo-design-transparent-logo-design-images-pluspng-template.png" alt="logo" class="img-fluid" style={{ width: '70%' }} />
                                    </a>
                                </Link>
                            </div>
                            <div class="col-3" style={{ marginTop: '10%' }}>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>


                        <div class="collapse navbar-collapse" id="navbarNav">
                            <div class="row">
                                <div class='col-4'></div>
                                <div class='col-4'>
                                    <center>
                                        <div class="row">
                                            <p className="col-6">
                                                <Link to="/login">
                                                    <button class="btn btn-primary"> Login </button>
                                                </Link>
                                            </p>
                                            <p className="col-6">
                                                <Link to="/signup">
                                                    <button class="btn btn-primary"> SignUp </button>
                                                </Link>
                                            </p>
                                        </div>
                                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                            <li class="nav-item mt-2 active">
                                                <Link to="/lotto">
                                                    <a> Play Game  </a>
                                                </Link>
                                            </li>

                                            <li class="nav-item mt-2 active">
                                                <Link to="/checkResults">
                                                    <a> Check Results </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </center>
                                </div>
                                <div class='col-4'></div>
                            </div>
                        </div>
                    </nav>
                    {/* for small screens// */}
                </div>
            )
        }
    }
}