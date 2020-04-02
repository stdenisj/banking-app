import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import AccountList from './components/AccountList'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/' component = { AccountList }/>
          <Route path = '/login' component = { LoginForm } />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
