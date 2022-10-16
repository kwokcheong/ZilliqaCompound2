import React from 'react'
import axios from "axios"
import { Component } from 'react'

class CoinAPI extends Component {

    constructor(props){
        super(props);
        this.state = {
            coin1: ""
        }
    }

    componentDidMount() {
        this.getCoin();
        this.interval = setInterval(() => {
            this.getCoin();
        }, 1000)
    }

    getCoin(){
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: "sgd",
            ids: "zilliqa"
            },
        }).then(response => 
            this.setState(prevState => ({ 
                coins: response.data[0].current_price})));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return(
            <div><h1>{this.state.coins}</h1></div>
        )
    }
}

export default CoinAPI

