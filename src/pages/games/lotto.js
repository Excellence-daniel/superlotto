import React, { Component } from 'react';
import Header from '../header';

export default class Lotto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lottoNos: [],
            numbers: [],
            pickedNumbers: [],
            winNumbers: []
        };
    }

    componentDidMount = () => {
        var x = document.getElementById("toast");
        x.innerText = "Select just 2 random numbers..."
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
        var restartbtn = document.getElementById('restartBtn');
        restartbtn.disabled = true;
        var allnos = this.state.numbers;
        for (var i = 1; i <= 30; i++) {
            allnos.push(i);
            this.setState({ numbers: allnos });
        }
    };

    restartGame = () => {
        var restartbtn = document.getElementById('restartBtn');
        restartbtn.disabled = true;
        this.setState({ pickedNumbers: [], winNumbers: [], lottoNos: [] });
    }

    generateNos = () => {
        let restartbtn = document.getElementById('restartBtn');
        const guessed = this.state.lottoNos;
        const pickednos = this.state.pickedNumbers;
        const winNums = this.state.winNumbers;
        // var newNumber = Math.floor(Math.random() * 30);
        // winNums.push(newNumber);
        // this.setState({ winNumbers: winNums });
        //  this.setState({ winNumbers: 1 });
        // if (guessed.length < 5) {
        const self = this;
        setInterval(function () {
            if (guessed.length < 5) {
                var newNumber = Math.floor(Math.random() * 30);
                guessed.push(parseInt(newNumber));
                self.setState({ lottoNos: guessed });

                let index = pickednos.includes(parseInt(newNumber));
                console.log(index);
                if (index){
                    const numberWon = parseInt(newNumber);
                    console.log('Found')
                    winNums.push(numberWon);
                    self.setState({winNumbers : winNums});
                }

                if (guessed.length === 5) {
                    var x = document.getElementById("toast");
                    x.innerText = "Finished Generating..."
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);

                    if (winNums.length > 0){
                        x.innerText = "You won " + winNums.length + "balls."
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    } else {
                        x.innerText = "You didn't win any ball."
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    }
                    restartbtn.disabled = false;
                }
            }


        }, 3000)
    };

    getNum = e => {
        var pickednos = this.state.pickedNumbers;
        var newNum = e.target.id;
        console.log(newNum);

        if (pickednos.length < 2) {
            pickednos.push(parseInt(newNum));
            this.setState({ pickedNumbers: pickednos });

            if (pickednos.length === 2) {
                var x = document.getElementById("toast");
                x.innerText = "Generate Lotto Numbers..."
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
                // setInterval(this.generateNos(), 3000);
                // this.generateNos();
            }
        }
    };

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-12 col-md-7">
                            <div className="col-12">
                                <div className="card card-body">
                                    <h2> Random Numbers </h2>
                                    <ul>
                                        {this.state.numbers.map(num => (
                                            <li onClick={this.getNum} id={num} className="all-number-balls" disabled>
                                                <span disabled id={num}>{num}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="row">
                                    <div className="col-12 col-md-5">
                                        <div className="card card-body">
                                            <h2> Picked Numbers </h2>
                                            <ul>
                                                {this.state.pickedNumbers.map(picked => (
                                                    <li className="picked-balls">
                                                        <span>{picked}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-7">
                                        <div className="card card-body">
                                            <h2> Lotto Numbers </h2>
                                            <ul>
                                                {this.state.lottoNos.map(number => (
                                                    <li className="lotto-balls" disabled>
                                                        <span>{number}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card card-body col-12 col-md-6 offset-md-3 mt-4">
                                        <h2> Win Numbers </h2>
                                        <ul>
                                            {this.state.winNumbers.map((wins) => (
                                                <li className="wins-balls"> {wins} </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <button className="btn btn-block btn-info" onClick={this.generateNos}> Generate Lotto Numbers </button>
                            </div>

                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card card-body">
                                <p className="col-12">
                                    <label> Amount </label>
                                    <input type="number" onChange={this.amounttoPlay} />
                                    <button className="btn btn-block btn-info"> Play </button>
                                </p>

                                <p className="col-12" id="stats">
                                    <span> Stats </span>
                                    <p> Games Played : <span id="toright"> 3 </span></p>
                                    <p> Wins : <span id="toright"> 3 </span></p>
                                    <p> Losses : <span id="toright"> 3 </span></p>
                                    <p> Amount Won(#) : <span id="toright"> 3 </span></p>
                                    <p> Amount Lost (#) : <span id="toright"> 3 </span></p>
                                </p>

                                <p className="col-12">
                                    <button id="restartBtn" onClick={this.restartGame} className="btn btn-info btn-block"> Restart Game </button>
                                </p>
                                <div id="toast">
                                    Toast Message
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}