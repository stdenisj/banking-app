import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Container, Accordion, Card, Table } from 'react-bootstrap'
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
            // console.log( amount, action, this.props.account.balance, typeof(this.props.account.balance), typeof(amount), typeof(action))
            const updatedAccount = { ...this.props.account }
            const enteredAmount = Number(amount)
            if (action === 'Withdraw') {
                updatedAccount.balance -= enteredAmount;
            }
            else {
                updatedAccount.balance += enteredAmount;
            }
            console.log(updatedAccount)
            const res = await axios.put(`/api/v1/accounts/${updatedAccount.id}/`, updatedAccount, { headers: { "Authorization" : `Bearer ${this.props.token}`}})
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        const { id, title, user, transactions, balance} = this.props.account
        return (
            // <Container fluid>
            //     <h1 onClick={ this.toggleTransactions }>{ this.props.account.title }</h1>
            //     { this.state.transactions
            //         ? <Container fluid>
            //             { this.props.account.transactions.map( (transaction, index) => {
            //                 return <TransactionDetails transaction={ transaction } key={ index } />
            //             })
            //             }
            //                 <TransactionForm userId={ this.props.account.user } accountId={ this.props.account.id } token={ this.props.token } />
            //             </Container>
            //         : null
            //     }
            // </Container> 

        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={ id }>
            { title }
            <span>
                Balance: ${ balance }
            </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={ id }>
            <Card.Body>

                <Table striped bordered hover variant="dark" responsive>
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

