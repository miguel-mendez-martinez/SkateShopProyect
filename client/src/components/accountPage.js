import React, {Component} from "react"

import {Redirect} from 'react-router-dom'

import HistoryTable from './HistoryTable.js'

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"
import WebHeader from "./WebHeader"

export default class AccountPage extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = {
            name: this.props.location.state.id,
            transactions: null,
            redirect:false
        }

    }

    componentDidMount()
    {
        //we need to get the history from the account
        axios.get(`${SERVER_HOST}/sales`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
                {
                    this.setState({transactions: res.data}) 
                    this.setState({mounted: true})
                }
                else
                {
                    console.log("Records not found")
                }
        })
    }

    render() 
    {   
        return (       
            
            <div className="web-container">
                <WebHeader/>
                <div className="content-container">
                    {this.state.redirect ? <Redirect to="/DisplayAllSkates"/> : null}
                    <h2> {this.state.name}'s personal page.</h2> <br/>

                    {this.state.transactions === null ? 
                    <div className="errorDiv">No history found for this user.</div>
                    : 
                    <div className="history-table">
                    <HistoryTable transactions={this.state.transactions} /> 
                    </div>} 
                </div>
            </div>
        )
    }
}