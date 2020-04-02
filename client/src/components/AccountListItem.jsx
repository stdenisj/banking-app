import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class AccountListItem extends Component {
    render() {
        return (
            <li>
                <h1>{ this.props.account.title }</h1>
            </li>   
        )
    }
}

