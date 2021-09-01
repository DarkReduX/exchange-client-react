import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react';
import { BrowserRouter, BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn'
import Positions from './components/Positions/Positions';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import axios from 'axios';
import { getToken,removeUserSession, setUserSession } from './utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken()
    if (!token) {
      return
    }

    axios.get(`http://localhost:1323/verifyToken?token=${token}`)
    .then(response => {
      setUserSession(response.data.token, response.data.user)
      setAuthLoading(false)
    })
    .catch(error => {
      removeUserSession()
      setAuthLoading(false)
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/positions">Positions</NavLink><small>(Access with token only)</small>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component="" />
            <PublicRoute path="/login" component={LogIn} />
            <PrivateRoute path="/positions" component={Positions} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
