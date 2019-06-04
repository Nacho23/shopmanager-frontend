import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './Redux';
import history from './Services/history';
import './App.scss';

// Pages
import { DefaultLayout } from './Containers';
import LoginContainer from './Containers/Login/LoginContainer';

const store = createStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path='/login' name='Login Page' component={LoginContainer} />
            <Route path='/' component={DefaultLayout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
