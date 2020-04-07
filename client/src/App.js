import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AccountHolderView from './components/AccountHolderView'
import LoginPage from './components/LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  state = {
    token: {},
    user: {}
  }

  getToken = (response) => {
    this.setState({ token: response.token, user: response.user })
  }

  render() {
    const AccountHolderViewComponent = () => (<AccountHolderView token={ this.state.token } user={ this.state.user }/>)
    const LoginPageComponent = () => (<LoginPage  getToken={ this.getToken }/>)

    return (
      <div className="App" id='Application'>
        <Router>
          <Switch>
            <Route exact path = '/account' render = { AccountHolderViewComponent }/>
            <Route exact path = '/' render = { LoginPageComponent } />
          </Switch>
        </Router>
      </div>
    );
  }
}