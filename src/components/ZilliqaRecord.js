import React from "react";
import ZilliqaTable from "./ZilliqaTable"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { Component } from 'react'


class ZilliqaRecord extends Component {

    constructor(props){
        super(props);
        console.log(this.props.item)
        this.state = {
            compoundWeekly: this.props.item.compoundWeekly,
            zilPerDay: this.props.item.zilPerDay,
            zilPerWeek: this.props.item.zilPerWeek,
            zilPerMonth: this.props.item.zilPerMonth,
            price: 0
        }
    };

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
                price: response.data[0].current_price})));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    JsonSerializer(data){ 
        let serializedData =[];
        // to be in this format { week: , compounded: , zilperday: , zilperWeek, zilperMonth }
        for (let i=0; i<this.props.item.compoundWeekly.length; i++){
            serializedData.push({  'week': `${parseInt(i)}`, 
                                   'compound': `${this.props.item.compoundWeekly[i]}`,
                                   'zilperDay': `${this.props.item.zilPerDay[i]}`,
                                   '$SGDperDay': `${parseFloat(this.props.item.zilPerDay[i] * this.state.price).toFixed(2)}`,
                                   'zilperWeek': `${this.props.item.zilPerWeek[i]}`, 
                                   '$SGDperWeek': `${parseFloat(this.props.item.zilPerWeek[i] * this.state.price).toFixed(2)}`,
                                   'zilperMonth': `${this.props.item.zilPerMonth[i]}`,
                                   '$SGDperMonth': `${parseFloat(this.props.item.zilPerMonth[i] * this.state.price).toFixed(2)}`
                                })
        }
        return serializedData;
    }

    render(){
        return (
            <ZilliqaTable 
                tableData={this.JsonSerializer(this.props.item)}
                headingColumns={['Week', 'Compound', 'Daily', '$SGD Per Day', 'Weekly', '$SGD Per Week', 'Monthly', '$SGD Per Month']}            
                title="Zilliqa Compounded Earnings"
            />
        );
    }
}

export default ZilliqaRecord