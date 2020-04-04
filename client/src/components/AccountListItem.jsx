import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import TransactionDetails from './TransactionDetails'


export default class AccountListItem extends Component {
    state = {
        transactions: false
    }

    toggleTransactions = (event) => {
        event.preventDefault();
        this.setState({ transactions: !this.state.transactions});
    }

    render() {
        return (
            <Container fluid>
                <h1 onClick={ this.toggleTransactions }>{ this.props.account.title }</h1>
                { this.state.transactions
                    ? this.props.account.transactions.map( (transaction, index) => {
                        return <TransactionDetails transaction={ transaction } key={ index } />
                    })
                    : null
                }
            </Container> 
        )
    }
}

