import React, { Component } from 'react';
import Header from '../header';
import { Redirect } from 'react-router-dom';
import { fireAuth, fireStore } from '../../config/index';

import LottoDesktop from './views/lotto-desktop';
import LottoMobile from './views/lotto-mobile';

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
            numberOfBallsWon: 0,
            playerAccountBalance: 0,
            playerAccountID: '',
            redirect: false
        };
    }

    componentDidMount = async () => {
        const toast = document.getElementById("toast");
        const endGameBtn = document.getElementById('endGame');
        const playGameBtn = document.getElementById('playGame');
        const selectAmount = document.getElementById('betAmount');
        const generateLottoBtn = document.getElementById('generateLotto');

        playGameBtn.disabled = true;
        selectAmount.disabled = true;
        endGameBtn.disabled = true;
        generateLottoBtn.disabled = true;
        let allnos = this.state.numbers;
        for (let i = 1; i <= 30; i++) {
            allnos.push(i);
            this.setState({ numbers: allnos });
        }
        const user = await fireAuth.auth().currentUser;
        console.log('User', user);
        if (user === null) {
            alert('Log in to play game');
            await fireAuth.auth().signOut();
            localStorage.removeItem('UserLoggedIn');
            this.setState({ redirect: true });
        } else {
            const getPlayerData = await fireStore.collection('Accounts').where('Email', '==', user.email).get();
            const playerAccountBalance = getPlayerData.docs[0].data().AccountBalance;
            const playerAccountID = getPlayerData.docs[0].id;
            this.setState({ playerAccountBalance, playerAccountID });

            playGameBtn.disabled = false;
            selectAmount.disabled = false;
            toast.innerText = "Pick an amount to bet on.";
            toast.className = "show";
        }
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
    };

    amounttoPlay = (e) => {
        if (e.target.value) {
            this.setState({ betAmount: e.target.value });
        }
    }

    startGame = async () => {
        const playersAccountbalance = this.state.playerAccountBalance;
        const playersBetAmount = this.state.betAmount;
        const toast = document.getElementById('toast');
        if (this.state.betAmount === 0) {
            toast.innerText = 'You have to place a bet on an amount to play this game';
            toast.className = 'show';
        } else {
            if (playersBetAmount > playersAccountbalance) {
                alert("You don't have enough money in your account to place this amount on a bet. Recharge and try again or pick a lower amount");
            } else {
                const newBalance = this.state.playerAccountBalance - playersBetAmount;
                await fireStore.collection('Accounts').doc(this.state.playerAccountID).update({
                    AccountBalance: newBalance
                });
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
                endGameBtn.disabled = true;
                this.setState({ pickedNumbers: [], winNumbers: [], lottoNos: [], gamesPlayed: (numberofGamesPlayed + 1), amountPlayed: (amountPlayed + amountBetOn) });
                ulForRandomNum.id = "show";
            }
        }
        setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
    }

    generateLottoNumbers = () => {
        const playGameBtn = document.getElementById("playGame");
        const selectAmount = document.getElementById('betAmount');
        const endGameBtn = document.getElementById('endGame');
        const generateLottoBtn = document.getElementById('generateLotto');
        const loader = `<img src = 'img/loader.gif' alt = 'loader' style = 'width : 5%'/>`;
        generateLottoBtn.innerHTML = loader;
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
                    generateLottoBtn.innerText = 'Generate Lotto Numbers';
                    if (winNums.length > 0) {
                        self.setState({ winsCash: (parseInt(amountWon) + (parseInt(amountBetOn) * parseInt(winNums.length))), wins: gamesWon + 1 });
                        toast.innerText = "You won " + winNums.length + " balls."
                        toast.className = "show";
                    } else {
                        self.setState({ lossesCash: (parseInt(amountLost) + parseInt(amountBetOn)), losses: gamesLost + 1 });
                        toast.innerText = "You didn't win any ball."
                        toast.className = "show";
                    }
                    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
                    endGameBtn.disabled = false;
                    playGameBtn.innerText = 'Play Again ?';
                    playGameBtn.disabled = false;
                    selectAmount.disabled = false;
                }
            }
            setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
        }, 3000)
        
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

    endGameAndGetResult = async () => {
        const result = document.getElementById('result');
        const generateLottoBtn = document.getElementById('generateLotto');
        const selectAmount = document.getElementById('betAmount');
        const playGameBtn = document.getElementById('playGame');
        const endGameBtn = document.getElementById('endGame');
        const ulForRandomNum = document.getElementById('disabled');
        const amountBalance = (parseInt(this.state.amountPlayed) + parseInt(this.state.winsCash)) - parseInt(this.state.lossesCash);
        // this.setState({finalWinBalance})

        generateLottoBtn.disabled = true;
        selectAmount.disabled = true;
        playGameBtn.disabled = true;
        endGameBtn.disabled = true;
        ulForRandomNum.disabled = true;
        result.innerText = `Your final balance is #${amountBalance}.`;
        const getPlayerAccountDetails = await fireStore.collection('Accounts').doc(this.state.playerAccountID).get()
        const playerData = getPlayerAccountDetails.data();
        let wins = parseInt(playerData.Wins);
        let losses = parseInt(playerData.Losses);
        let winsCash = parseInt(playerData.WinsCash);
        let lossesCash = parseInt(playerData.LossesCash);
        console.log(wins, losses, winsCash, lossesCash);

        await fireStore.collection('Accounts').doc(this.state.playerAccountID).update({
            Wins: (wins + parseInt(this.state.wins)),
            Losses: (losses + parseInt(this.state.losses)),
            LossesCash: (lossesCash + parseInt(this.state.lossesCash)),
            WinsCash: (winsCash + parseInt(amountBalance))
        })
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <Header />
                {/* <div className="col-12">
                    <LottoDesktop
                        playerPickNumbers={this.playerPickNumbers}
                        numbers={this.state.numbers}
                        pickedNumbers={this.state.pickedNumbers}
                        lottoNos={this.state.lottoNos}
                        winNumbers={this.state.winNumbers}
                        generateLottoNumbers={this.generateLottoNumbers}
                        amounttoPlay={this.amounttoPlay}
                        startGame={this.startGame}
                        gamesPlayed={this.state.gamesPlayed}
                        wins={this.state.wins}
                        losses={this.state.losses}
                        lossesCash={this.state.lossesCash}
                        winsCash={this.state.winsCash}
                        amountPlayed={this.state.amountPlayed}
                        endGameAndGetResult={this.endGameAndGetResult}
                    />
                </div> */}

                <div className="col-12">
                    <LottoMobile
                        playerPickNumbers={this.playerPickNumbers}
                        numbers={this.state.numbers}
                        pickedNumbers={this.state.pickedNumbers}
                        lottoNos={this.state.lottoNos}
                        winNumbers={this.state.winNumbers}
                        generateLottoNumbers={this.generateLottoNumbers}
                        amounttoPlay={this.amounttoPlay}
                        startGame={this.startGame}
                        gamesPlayed={this.state.gamesPlayed}
                        wins={this.state.wins}
                        losses={this.state.losses}
                        lossesCash={this.state.lossesCash}
                        winsCash={this.state.winsCash}
                        amountPlayed={this.state.amountPlayed}
                        endGameAndGetResult={this.endGameAndGetResult}
                    />
                </div>

                <div id="toast">
                    {/* Toast Message Goes In Here */}
                </div>
            </div>
        )
    }
}