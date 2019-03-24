import React from 'react';

export default function LottoMobile(props){
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-12 col-md-7">
                    <div className="col-12">
                        <div className="card card-body">
                            <h2> Random Numbers </h2>
                            <ul id="disabled">
                                {props.numbers.map(num => (
                                    <li onClick={props.playerPickNumbers} id={num} className="all-number-balls" disabled>
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
                                        {props.pickedNumbers.map(picked => (
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
                                        {props.lottoNos.map(number => (
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
                                    {props.winNumbers.map((wins) => (
                                        <li className="wins-balls"> {wins} </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <button className="btn btn-block btn-info" id="generateLotto" onClick={props.generateLottoNumbers}> Generate Lotto Numbers </button>
                    </div>

                </div>
                <div className="col-12 col-md-3">
                    <div className="card card-body">
                        <p className="col-12">
                            <label> Amount </label>
                            <select className="form-control" onChange={props.amounttoPlay} id="betAmount">
                                <option value="" selected disabled> --Select An Amount To Bet On -- </option>
                                <option value="500"> #500 </option>
                                <option value="1000"> #1,000</option>
                                <option value="2000"> #2,000 </option>
                                <option value="5000"> #5,000 </option>
                                <option value="10000"> #10,000 </option>
                            </select>
                            <button className="btn btn-block btn-info mt-2" id="playGame" onClick={props.startGame}> Play </button>
                        </p>

                        <p className="col-12" id="stats">
                            <span> Stats </span>
                            <p> Games Played : <span id="toright"> {props.gamesPlayed} </span></p>
                            <p> Wins : <span id="toright"> {props.wins} </span></p>
                            <p> Losses : <span id="toright"> {props.losses} </span></p>
                            <p> Amount Won(#) : <span id="toright"> {props.winsCash} </span></p>
                            <p> Amount Lost (#) : <span id="toright"> {props.lossesCash} </span></p>
                            <p> Amount Played (#) : <span id="toright"> {props.amountPlayed} </span></p>
                            <p> <button className="btn btn-block btn-danger" id="endGame" onClick={props.endGameAndGetResult}> End Game </button></p>
                            <p id="result"> </p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}