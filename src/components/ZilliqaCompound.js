import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ZilliqaRecord from './ZilliqaRecord';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class ZilliqaCompound extends Component {
    constructor(){
        super();
        this.state = {
            capital: '',
            weeks: '',
            apy: '',
            total: '',
            results:
                {
                    compoundWeekly: [],
                    zilPerDay: [],
                    zilPerWeek: [],
                    zilPerMonth: [],
                }
        };
    };


    handleCapital = e => {
        this.setState({ capital: e.target.value })
    }

    handleWeeks = e => {
        this.setState({ weeks: e.target.value })
    }

    handleApy = e => {
        this.setState({ apy: e.target.value })
    }

    zilliqaPerDay = (capital, apy) => {
        let percentPerDay = apy / 36600;
        return (capital * percentPerDay).toFixed(2);
    }

    zilliqaPerWeek = (zilPerDay) => {
        return (zilPerDay * 7).toFixed(2);
    }

    zilliqaPerMonth = (zilPerWeek) => {
        return (zilPerWeek * 4).toFixed(2);
    }

    zilliqaCompoundWeekly = (capital, weeks, apy) => {
        let sum = capital;
        let compounded = [];
        let perDay = [];
        let perWeek = [];
        let perMonth = [];
        for (let i=0; i<=weeks; i++){
            compounded.push(sum.toFixed(2))
            perDay.push(this.zilliqaPerDay(sum,apy));
            perWeek.push(this.zilliqaPerWeek(this.zilliqaPerDay(sum,apy)));
            perMonth.push(this.zilliqaPerMonth(this.zilliqaPerWeek(this.zilliqaPerDay(sum,apy))));
            sum += (this.zilliqaPerWeek(this.zilliqaPerDay(sum, apy)) * Math.pow(i, 0)) - 10;
        }
        this.setState(prevState => ({ results: {compoundWeekly: compounded,
                                                zilPerDay: perDay,
                                                zilPerWeek: perWeek,
                                                zilPerMonth: perMonth
                                            }}));

    }

    compileForm = e => {
        e.preventDefault();
        //if monthly
                //code here
        //if weekly
        this.zilliqaCompoundWeekly(parseFloat(this.state.capital),
                                    parseInt(this.state.weeks), 
                                    parseFloat(this.state.apy));
    }

    clearList = e => {
        this.setState({
            capital: '',
            weeks: '',
            apy: '',
        })
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.compileForm}>
                    <Row>
                        <Col>
                            <Form.Label>Total Amount of Zil</Form.Label>
                            <Form.Control type='text' placeholder="Enter initial capital" value={this.state.capital} onChange={this.handleCapital}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>No of Weeks</Form.Label>
                            <Form.Control type='text' placeholder="Enter Weeks" value={this.state.weeks} onChange={this.handleWeeks}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>APY</Form.Label>                        
                            <Form.Control type='text' placeholder="Enter APY" value={this.state.apy} onChange={this.handleApy}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='info' type="submit">Calculate</Button>
                            <Button variant='secondary' onClick={this.clearList}>Clear List</Button>
                        </Col>
                    </Row>
                </Form>
                

                { this.state.results.compoundWeekly.length === 0? "" : <ZilliqaRecord item={this.state.results}/>}
            </div>
        )
    }
}

export default ZilliqaCompound;

