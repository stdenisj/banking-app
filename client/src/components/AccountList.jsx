import React, { Component } from 'react'
import axios from 'axios';

export default class AccountList extends Component {
    state = {
        accounts: []
    }


    componentDidMount(){
        this.fetchAccounts();
    }

    fetchAccounts = async() => {
        try {
            const res = await axios.get('/api/v1/accounts/');
            this.setState({ accounts: res.data })
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <h1>hello</h1>
            </div>
        )
    }
}
