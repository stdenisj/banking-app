import React, { Component } from 'react'
import AccountListItem from './AccountListItem'

export default class AccountList extends Component {

    render() {
        return (
            <div>
                <h1> List of Accounts </h1>
                <ul>
                    {
                        this.props.accounts.map( (account, index) => {
                            return <AccountListItem account={ account } key={ index } />
                        })
                    }
                </ul>
            </div>
        )
    }
}
