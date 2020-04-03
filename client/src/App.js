import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import AccountHolderView from './components/AccountHolderView'
import LoginForm from './components/LoginForm'

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
    const LoginFormComponent = () => (<LoginForm  getToken={ this.getToken }/>)

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = '/account' render = { AccountHolderViewComponent }/>
            <Route exact path = '/' render = { LoginFormComponent } />
          </Switch>
        </Router>
      </div>
    );
  }
}