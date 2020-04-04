import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Container, Accordion, Card } from 'react-bootstrap'
import TransactionDetails from './TransactionDetails'
import TransactionForm from './TransactionForm'


export default class AccountListItem extends Component {
    state = {
        transactions: false
    }

    toggleTransactions = (event) => {
        event.preventDefault();
        this.setState({ transactions: !this.state.transactions});
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
                { transactions.map( (transaction, index) => {
                        return <TransactionDetails transaction={ transaction } key={ index } />
                    })
                }
                    <br/>
                    <TransactionForm userId={ user } accountId={ id } token={ this.props.token } />
                </Card.Body>
            </Accordion.Collapse>
            </Card>
        )
    }
}

