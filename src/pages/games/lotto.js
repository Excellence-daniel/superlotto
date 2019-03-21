import React, { Component } from 'react';
import Header from '../header';

export default class Lotto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lottoNos: [],
            numbers: [],
            pickedNumbers: []
        };
    }

    componentDidMount = () => {
        console.log("hey");
        var allnos = this.state.numbers;
        for (var i = 1; i <= 80; i++) {
            // console.log(i);
            allnos.push(i);
            this.setState({ numbers: allnos });
        }
    };

    generateNos = () => {
        var guessed = this.state.lottoNos;
        if (guessed.length < 5) {
            var newNumber = Math.floor(Math.random() * 80);
            guessed.push(newNumber);
            this.setState({ lottoNos: guessed });
        } else {
            alert("Ended");
        }
    };

    getNum = e => {
        var pickednos = this.state.pickedNumbers;
        var newNum = e.target.id;
        console.log(newNum);

        if (pickednos.length < 2) {
            pickednos.push(newNum);
            this.setState({ pickedNumbers: pickednos });
        } else {
            alert("You cannot pick more than 2");
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
                            <div className="card card-body">
                                <ul>
                                    {this.state.numbers.map(num => (
                                        <li onClick={this.getNum} id={num} className="all-number-balls">
                                            <span id={num}>{num}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-3"></div>
                    </div>
                </div>


                <button onClick={this.generateNos}> Generate Number </button>
                <h2> Picked Numbers </h2>
                <ul>
                    {this.state.pickedNumbers.map(picked => (
                        <li className="ball">
                            <span>{picked}</span>
                        </li>
                    ))}
                </ul>
                <div>
                    <h2> Lotto Numbers </h2>
                    <ul>
                        {this.state.lottoNos.map(number => (
                            <li className="ball">
                                <span>{number}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}