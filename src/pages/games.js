import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

export default class Games extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-12 col-md-4 frame zoomin">
                        <Link to='/lotto'>
                                <h3> Lotto Balls </h3>
                                <img src = "https://superlottong.com/Content/assets/superlotto/img/live-games/lucky-5.jpg" alt="Lotto Balls" className="img-fluid" />
                        </Link>
                        </div>
                        <div className="col-12 col-md-4 frame zoomin">
                        <Link to='/games/lottoball'>
                                <h3> Game 2 </h3>
                                <img src = "https://superlottong.com/Content/assets/superlotto/img/live-games/lucky-6.jpg" alt="Lotto Balls" className="img-fluid" />
                        </Link>
                        </div>
                        <div className="col-12 col-md-4 frame zoomin">
                        <Link to='/games/lottoball'>
                                <h3> Game 3 </h3>
                                <img src = "https://superlottong.com/Content/assets/superlotto/img/live-games/lucky-7.jpg" alt="Lotto Balls" className="img-fluid" />
                        </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}