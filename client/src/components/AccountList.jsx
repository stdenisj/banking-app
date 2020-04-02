import React, { Component } from 'react'
import axios from 'axios';
import AccountListItem from './AccountListItem'

export default class AccountList extends Component {
    state = {
        accounts: [],
    }


    componentDidMount(){
        this.fetchAccounts();
    }

    fetchAccounts = async() => {
        try {
            const res = await axios.get('/api/v1/accounts/', this.props.token);
            this.setState({ accounts: res.data })
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1> List of Accounts </h1>
                <ul>
                    {
                        this.state.accounts.map( (account, index) => {
                            return <AccountListItem account={ account } key={ index } />
                        })
                    }
                </ul>
            </div>
        )
    }
}
