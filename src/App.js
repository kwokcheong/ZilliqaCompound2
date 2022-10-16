import React, { Component } from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ZilliqaCompound from './components/ZilliqaCompound';
import CoinAPI from './components/CoinAPI.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      coinsAPI:
       {
          coins: "digibyte",
          vs_currency: "sgd"
       }
    }
  };

  render() {
    return (
      <div>
        <Header title="Zilliqa Compound Calculator v2"/>
        <ZilliqaCompound/>
        <CoinAPI data={this.state.coinsAPI}/>
      </div>
    );
  }
}

export default App;
