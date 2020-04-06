import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Container, Accordion, Card, Table, Navbar } from 'react-bootstrap'
import TransactionDetails from './TransactionDetails'
import TransactionForm from './TransactionForm'
import axios from 'axios'


export default class AccountListItem extends Component {
    state = {
        transactions: false
    }

    toggleTransactions = (event) => {
        event.preventDefault();
        this.setState({ transactions: !this.state.transactions});
    }

    updateAccount = async(amount, action) => {
        try {
            const updatedAccount = { ...this.props.account }
            const enteredAmount = Number(amount)
            if (action === 'Withdraw') {
                updatedAccount.balance -= enteredAmount;
            }
            else {
                updatedAccount.balance += enteredAmount;
            }
            const res = await axios.put(`/api/v1/accounts/${updatedAccount.id}/`, updatedAccount, { headers: { "Authorization" : `Bearer ${this.props.token}`}})
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        const { id, title, user, transactions, balance} = this.props.account
        return (
        <Card>
            <Accordion.Toggle as={Card} eventKey={ id }>
                <Card>
                    <h3>{ title }</h3>
                    <h4>Balance: ${ balance }</h4>
                    <h6>Expand</h6>
                </Card>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={ id }>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Deposits</th>
                            <th>WithDrawals</th>
                            <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                                { transactions.map( (transaction, index) => {
                                    return <TransactionDetails transaction={ transaction } key={ index } account={ this.props.account } />
                                })
                            }
                        </tbody>
                    </Table>
                        <TransactionForm 
                            userId={ user } 
                            accountId={ id }
                            account={ this.props.account } 
                            token={ this.props.token } 
                            fetchAccounts={ this.props.fetchAccounts }
                            updateAccount={ this.updateAccount }/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        )
    }
}

