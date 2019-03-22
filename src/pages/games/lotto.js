import React, { Component } from 'react';
import Header from '../header';

export default class Lotto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lottoNos: [],
            numbers: [],
            pickedNumbers: [],
            winNumbers: [],
            betAmount: 0,
            wins: 0,
            losses: 0,
            winsCash: 0,
            lossesCash: 0,
            amountPlayed: 0,
            gamesPlayed: 0,
            numberOfBallsWon: 0
        };
    }

    componentDidMount = () => {
        const x = document.getElementById("toast");
        const endGameBtn = document.getElementById('endGame');
        endGameBtn.disabled = true;
        x.innerText = "Select just 2 random numbers..."
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
        let allnos = this.state.numbers;
        for (let i = 1; i <= 30; i++) {
            allnos.push(i);
            this.setState({ numbers: allnos });
        }
    };

    amounttoPlay = (e) => {
        if (e.target.value) {
            this.setState({ betAmount: e.target.value })
        }
        const toast = document.getElementById('toast');
    }

    startGame = () => {
        const playGameBtn = document.getElementById('playGame');
        const selectAmount = document.getElementById('betAmount');
        const amountPlayed = parseInt(this.state.amountPlayed);
        const amountBetOn = parseInt(this.state.betAmount);
        let numberofGamesPlayed = this.state.gamesPlayed;
        console.log("games Played", numberofGamesPlayed);
        playGameBtn.disabled = true;
        selectAmount.disabled = true;
        this.setState({ pickedNumbers: [], winNumbers: [], lottoNos: [], gamesPlayed : (numberofGamesPlayed+1), amountPlayed : (amountPlayed + amountBetOn) });
        const ulForRandomNum = document.getElementById('disabled');
        ulForRandomNum.id = "show";
    }

    generateLottoNumbers = () => {
        const playGameBtn = document.getElementById("playGame");
        const selectAmount = document.getElementById('betAmount');
        const amountBetOn = this.state.betAmount;
        const x = document.getElementById("toast");
        const guessed = this.state.lottoNos;
        const pickednos = this.state.pickedNumbers;
        const winNums = this.state.winNumbers;
        let gamesWon = parseInt(this.state.wins);
        let gamesLost = parseInt(this.state.losses);
        let amountWon = this.state.winsCash;
        let amountLost = this.state.lossesCash;
        const self = this;
        setInterval(function () {
            if (guessed.length < 5) {
                x.innerText = "Generating Lotto Numbers Now...";
                x.className = "show";
                var newNumber = Math.floor(Math.random() * 30);
                guessed.push(parseInt(newNumber));
                self.setState({ lottoNos: guessed });

                let index = pickednos.includes(parseInt(newNumber));
                console.log(index);
                if (index) {
                    const numberWon = parseInt(newNumber);
                    console.log('Found');
                    winNums.push(numberWon);
                    self.setState({ winNumbers: winNums });
                    self.setState({ numberOfBallsWon: winNums.length });
                    // let newAmountWon = amountBetOn * winNums.length;
                    // self.setState({ winsCash: newAmountWon });
                }

                if (guessed.length === 5) {
                    x.innerText = "Finished Generating...";
                    if (winNums.length > 0) {
                        self.setState({winsCash : (parseInt(amountWon) + parseInt(amountBetOn)), wins : gamesWon+1});
                        // self.setState({numberOfBallsWon : winNums.length});
                        x.innerText = "You won " + winNums.length + " balls."
                        x.className = "show";
                    } else {
                        self.setState({lossesCash : (parseInt(amountLost) + parseInt(amountBetOn)), losses : gamesLost+1});
                        x.innerText = "You didn't win any ball."
                        x.className = "show";
                    }
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    playGameBtn.innerText = 'Play Again ?';
                    playGameBtn.disabled = false;
                    selectAmount.disabled = false;
                }
            }
        }, 3000)
    };

    playerPickNumbers = e => {
        const ulForRandomNum = document.getElementById("show");
        var pickednos = this.state.pickedNumbers;
        var newNum = e.target.id;
        console.log(newNum);

        if (pickednos.length < 2) {
            pickednos.push(parseInt(newNum));
            this.setState({ pickedNumbers: pickednos });

            if (pickednos.length === 2) {
                var x = document.getElementById("toast");
                ulForRandomNum.id = "disabled";
                x.innerText = "Generate Lotto Numbers..."
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
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
                                    <ul id="disabled">
                                        {this.state.numbers.map(num => (
                                            <li onClick={this.playerPickNumbers} id={num} className="all-number-balls" disabled>
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
                                <button className="btn btn-block btn-info" onClick={this.generateLottoNumbers}> Generate Lotto Numbers </button>
                            </div>

                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card card-body">
                                <p className="col-12">
                                    <label> Amount </label>
                                    <select onChange={this.amounttoPlay} id="betAmount">
                                        <option value="" selected disabled> --Select An Amount To Bet On -- </option>
                                        <option value="500"> #500 </option>
                                        <option value="1000"> #1,000</option>
                                        <option value="2000"> #2,000 </option>
                                        <option value="5000"> #5,000 </option>
                                    </select>
                                    <button className="btn btn-block btn-info mt-2" id="playGame" onClick={this.startGame}> Play </button>
                                </p>

                                <p className="col-12" id="stats">
                                    <span> Stats </span>
                                    <p> Games Played : <span id="toright"> {this.state.gamesPlayed} </span></p>
                                    <p> Wins : <span id="toright"> {this.state.wins} </span></p>
                                    <p> Losses : <span id="toright"> {this.state.losses} </span></p>
                                    <p> Amount Won(#) : <span id="toright"> {this.state.winsCash} </span></p>
                                    <p> Amount Lost (#) : <span id="toright"> {this.state.lossesCash} </span></p>
                                    <p> Amount Played (#) : <span id="toright"> {this.state.amountPlayed} </span></p>
                                    <p> <button className = "btn btn-block btn-danger" id = "endgame"> End Game  </button></p>
                                    <p id ="result"> </p>
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