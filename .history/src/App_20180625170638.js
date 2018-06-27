import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/drJR2BBIP4ggkvx9eTFl'));
var version = web3.version.api;
            
axios.get('https://api.opensea.io/api/v1/events?asset_contract_address=0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e&limit=100')
.then(function (data) {
    let assets = data.data.assets_events
    console.log(assets)
    // const result = assets.filter(asset => asset.total_price > 0);
    console.log(result)

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
