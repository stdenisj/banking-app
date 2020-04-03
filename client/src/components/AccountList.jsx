import React, { Component } from 'react'
import axios from 'axios';
import AccountListItem from './AccountListItem'

export default class AccountList extends Component {
    state = {
        accounts: [],
        user: {}
    }

    


    componentDidMount(){
        this.fetchUser();
        this.fetchAccounts();
    }
    
    fetchUser = async() => {
        try {
            const res = await axios.get('/api/v1/users/' + this.props.user +'/', { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            console.log(res)
            this.setState({ user: res.data })
        }
        catch (error) {
            console.log(error);
        }
    }
    
        fetchAccounts = async() => {
            try {
                const res = await axios.get('/api/v1/accounts/', { headers: { "Authorization" : `Bearer ${this.props.token}`}});
                this.setState({ accounts: res.data})
            }
            catch (error) {
                console.log(error)
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
