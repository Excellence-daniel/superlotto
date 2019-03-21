import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from '../index';
import SignUp from '../signup';
import Login from '../login';
import Account from '../account';
import Games from '../games';
import LottoBall from '../games/lotto-ball';
// import JoinClub from './club/joinClub'

// import ViewProfile from './profile/viewProfile'

export default function Routerr (){
    return (
        <Router> 
            <div> 
                <Route exact path = '/' component = {App}/>
                <Route exact path = '/signup' component = {SignUp}/>
                <Route exact path = '/login' component = {Login}/>
                <Route exact path = '/account' component = {Account}/>
                <Route exact path = '/games' component = {Games}/>
                <Route exact path = '/games/lottoball' component = {LottoBall}/>
                
                {/* <Route exact path = "/" component = {LandingPage}/>                

                <Route path = "/club/viewClubs" component = {ViewClubs}/>
                <Route exact path = "/club/addMembers" component = {AddMembers}/>
                <Route exact path = "/club/createClub" component = {CreateClub}/>
                <Route exact path = "/club/editClub" render ={(props) => <EditClub {...props}/>}/>
                <Route exact path = "/club/joinClub" component = {JoinClub}/>

                
                <Route exact path = "/profile/viewProfile" component = {ViewProfile}/> */}
            </div>  
        </Router>
    )
}