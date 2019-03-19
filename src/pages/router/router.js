import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from '../index';

// import LandingPage from './index'
// import LoginUser from './login'
// import SignUpUser from './signup'
// import VerifyEmail from './verifyEmail'

// import ViewClubs from './club/viewClubs'
// import AddMembers from './club/addMembers'
// import CreateClub from './club/createClub'
// import EditClub from './club/editClub'
// import JoinClub from './club/joinClub'

// import ViewProfile from './profile/viewProfile'

export default function Routerr (){
    return (
        <Router> 
            <div> 

                <Route exact path = '/' component = {App}/>
                {/* <Route exact path = "/" component = {LandingPage}/>
                <Route exact path = "/login" component = {LoginUser}/>
                <Route exact path = "/signup" component = {SignUpUser}/>
                <Route exact path = "/verifyEmail" component = {VerifyEmail}/>

                

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