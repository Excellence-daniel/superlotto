import React from 'react';

export default function LottoMobile(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 card card-body">
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
                </div>

                <div className="col-12 card card-body mt-3">
                    <h2> Random Numbers </h2>
                    <ul id="disabled">
                        {props.numbers.map(num => (
                            <li onClick={props.playerPickNumbers} id={num} className="all-number-balls" disabled>
                                <span disabled id={num}>{num}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-12 card card-body mt-3">
                    <h2> Picked Numbers </h2>
                    <ul>
                        {props.pickedNumbers.map(picked => (
                            <li className="picked-balls">
                                <span>{picked}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="btn btn-block btn-info mt-3" id="generateLotto" onClick={props.generateLottoNumbers}> Generate Lotto Numbers </button>

                <div className="col-12 card card-body mt-3">
                    <h2> Lotto Numbers </h2>
                    <ul>
                        {props.lottoNos.map(number => (
                            <li className="lotto-balls" disabled>
                                <span>{number}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-12 card card-body mt-3">
                    <h2> Win Numbers </h2>
                    <ul>
                        {props.winNumbers.map((wins) => (
                            <li className="wins-balls"> {wins} </li>
                        ))}
                    </ul>
                </div>

                <div className="col-12 card card-body mt-3">
                    <span> Stats </span>
                    <p> Games Played : <span id="toright"> {props.gamesPlayed} </span></p>
                    <p> Wins : <span id="toright"> {props.wins} </span></p>
                    <p> Losses : <span id="toright"> {props.losses} </span></p>
                    <p> Amount Won(#) : <span id="toright"> {props.winsCash} </span></p>
                    <p> Amount Lost (#) : <span id="toright"> {props.lossesCash} </span></p>
                    <p> Amount Played (#) : <span id="toright"> {props.amountPlayed} </span></p>
                    <p> <button className="btn btn-block btn-danger" id="endGame" onClick={props.endGameAndGetResult}> End Game </button></p>
                    <p id="result"> </p>
                </div>
            </div>
        </div>
    )
}