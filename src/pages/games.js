import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

export default class Games extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-md-3 frame zoomin">
                        <Link to='/lotto'>
                                <h3> Lotto Balls </h3>
                                <img src = "img/play-lotto.png" alt="Lotto Balls" className="img-fluid" />
                        </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}