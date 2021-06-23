import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Containers/Home/MainPage';
import GuestPage from './Components/Guest/GuestPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/' component={GuestPage} />
        <Redirect to='/' />
      </Switch>
    );
  }
}


export default App;
