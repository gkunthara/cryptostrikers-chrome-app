import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/drJR2BBIP4ggkvx9eTFl'));
var version = web3.version.api;
            
axios.get('https://api.opensea.io/api/v1/asset/0x06012c8cf97bead5deae237070f9587f8e7a266d/556324/')
.then(function (data) {
    console.log(data)
});
          

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
