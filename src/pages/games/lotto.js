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
        const toast = document.getElementById("toast");
        const endGameBtn = document.getElementById('endGame');
        const generateLottoBtn = document.getElementById('generateLotto');
        generateLottoBtn.disabled = true;
        endGameBtn.disabled = true;
        toast.innerText = "Pick an amount to bet on.";
        toast.className = "show";
        let allnos = this.state.numbers;
        for (let i = 1; i <= 30; i++) {
            allnos.push(i);
            this.setState({ numbers: allnos });
        }
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
    };

    amounttoPlay = (e) => {
        if (e.target.value) {
            this.setState({ betAmount: e.target.value })
        }
    }

    startGame = () => {
        const toast = document.getElementById('toast');
        if (this.state.betAmount === 0) {
            toast.innerText = 'You have to place a bet on an amount to play this game';
            toast.className = 'show';
        } else {
            toast.innerText = 'Click to Pick 5 random numbers';
            toast.className = 'show';
            const playGameBtn = document.getElementById('playGame');
            const selectAmount = document.getElementById('betAmount');
            const endGameBtn = document.getElementById('endGame');
            const amountPlayed = parseInt(this.state.amountPlayed);
            const amountBetOn = parseInt(this.state.betAmount);
            let numberofGamesPlayed = this.state.gamesPlayed;
            const ulForRandomNum = document.getElementById('disabled');
            console.log("games Played", numberofGamesPlayed);
            playGameBtn.disabled = true;
            selectAmount.disabled = true;
            endGameBtn.disabled = false;
            this.setState({ pickedNumbers: [], winNumbers: [], lottoNos: [], gamesPlayed: (numberofGamesPlayed + 1), amountPlayed: (amountPlayed + amountBetOn) });
            ulForRandomNum.id = "show";
        }
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
    }

    generateLottoNumbers = () => {
        const playGameBtn = document.getElementById("playGame");
        const selectAmount = document.getElementById('betAmount');
        const generateLottoBtn = document.getElementById('generateLotto');
        const amountBetOn = this.state.betAmount;
        const toast = document.getElementById("toast");
        const guessed = this.state.lottoNos;
        const pickednos = this.state.pickedNumbers;
        const winNums = this.state.winNumbers;
        let gamesWon = parseInt(this.state.wins);
        let gamesLost = parseInt(this.state.losses);
        let amountWon = this.state.winsCash;
        let amountLost = this.state.lossesCash;
        generateLottoBtn.disabled = true;
        const self = this;
        setInterval(function () {
            if (guessed.length < 5) {
                toast.innerText = "Generating Lotto Numbers Now.";
                toast.className = "show";
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
                }

                if (guessed.length === 5) {
                    toast.innerText = "Finished Generating.";
                    if (winNums.length > 0) {
                        self.setState({ winsCash: (parseInt(amountWon) + parseInt(amountBetOn)), wins: gamesWon + 1 });
                        toast.innerText = "You won " + winNums.length + " balls."
                        toast.className = "show";
                    } else {
                        self.setState({ lossesCash: (parseInt(amountLost) + parseInt(amountBetOn)), losses: gamesLost + 1 });
                        toast.innerText = "You didn't win any ball."
                        toast.className = "show";
                    }
                    playGameBtn.innerText = 'Play Again ?';
                    playGameBtn.disabled = false;
                    selectAmount.disabled = false;
                }
            }
            // setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
        }, 3000)
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
    };

    playerPickNumbers = e => {
        const ulForRandomNum = document.getElementById("show");
        const generateLottoBtn = document.getElementById('generateLotto');
        const toast = document.getElementById("toast");
        let pickednos = this.state.pickedNumbers;
        const newNum = e.target.id;
        console.log(newNum);

        if (pickednos.length < 5) {
            pickednos.push(parseInt(newNum));
            this.setState({ pickedNumbers: pickednos });

            if (pickednos.length === 5) {
                generateLottoBtn.disabled = false;
                ulForRandomNum.id = "disabled";
                toast.innerText = "Generate Lotto Numbers."
                toast.className = "show";
                setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 4000);
            }
        }
    };

    endGameAndGetResult = () => {
        const result = document.getElementById('result');
        const generateLottoBtn = document.getElementById('generateLotto');
        const selectAmount = document.getElementById('betAmount');
        const playGameBtn = document.getElementById('playGame');
        const endGameBtn = document.getElementById('endGame');
        const ulForRandomNum = document.getElementById('disabled');
        const amountBalance = (parseInt(this.state.amountPlayed) + parseInt(this.state.winsCash)) - parseInt(this.state.lossesCash);

        generateLottoBtn.disabled = true;
        selectAmount.disabled = true;
        playGameBtn.disabled = true;
        endGameBtn.disabled = true;
        ulForRandomNum.disabled = true;
        result.innerText = `Your final balance is #${amountBalance}.`;
    }

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
                                <button className="btn btn-block btn-info" id="generateLotto" onClick={this.generateLottoNumbers}> Generate Lotto Numbers </button>
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
                                    <p> <button className="btn btn-block btn-danger" id="endGame" onClick={this.endGameAndGetResult}> End Game  </button></p>
                                    <p id="result"> </p>
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