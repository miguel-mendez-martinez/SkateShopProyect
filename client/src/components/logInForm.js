import React, {Component} from "react"

import {Redirect, Link} from 'react-router-dom'

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"

export default class logInForm extends Component 
{

    constructor(props) 
    {
        super(props)

        this.state = {
            email: '',
            password: '',
            logged:false
        }

    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    logInUser = e => {
        axios.post(`${SERVER_HOST}/Users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            // default if not logged in
            sessionStorage.name = "GUEST"
            sessionStorage.accessLevel = ACCESS_LEVEL_GUEST 
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })
    }

    cancelUser = e => {

        this.setState({redirect: !this.state.redirect})
    }

    render() 
    {   
        return (           
            <div className="form-container">
                {this.state.logged ? <Redirect to="/DisplayAllSkates"/> : null}
                <h2> Users Log In </h2>
                <input id="email" type="text" name="email" placeholder="Email" onChange={this.handleChange}/><br/>
                <input id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/><br/>
                <input type="button" className="green-button" value="Add User" onClick={this.addUser}/>
                {/* <input type="button" value="Cancel" onClick={this.cancelCar}/> */} {/* it should be a link */}
                <Link className="red-button" to="/DisplayAllSkates"> Cancel </Link>
            </div> 
        )
    }
}