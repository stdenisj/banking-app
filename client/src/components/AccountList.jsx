import React, { Component } from 'react'
import AccountListItem from './AccountListItem'
import { Accordion } from 'react-bootstrap'

export default class AccountList extends Component {

    
    render() {
        return (
            <div>

                <Accordion>
                    {
                        this.props.accounts.map( (account, index) => {
                            return <AccountListItem 
                            account={ account } 
                            key={ index }  
                            token={ this.props.token }
                            fetchAccounts={ this.props.fetchAccounts }
                            />
                        })
                    }
                </Accordion>
            </div>
        )
    }
}

