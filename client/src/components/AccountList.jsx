import React, { Component } from 'react'
import AccountListItem from './AccountListItem'
import { Accordion } from 'react-bootstrap'

export default class AccountList extends Component {
    
    render() {
        return (
            <div>
                <h1> List of Accounts </h1>
                <Accordion>
                    {
                        this.props.accounts.map( (account, index) => {
                            return <AccountListItem account={ account } key={ index }  token={ this.props.token }/>
                        })
                    }
                </Accordion>
            </div>
        )
    }
}

