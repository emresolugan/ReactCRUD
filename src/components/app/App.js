import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import { Router } from 'react-router-dom';
import history from '../../config/history';
import Routes from '../../config/route';

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    )
 }
}

export default App;
