import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'

export default class TransactionForm extends Component {
    state = {
        transactionForm: {
            action: 'Withdraw',
            description: '',
            amount: 0,
        },
        isAddTransaction: false,
    }

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedtransactionForm = { ...this.state.transactionForm };
        updatedtransactionForm[changedInput] = event.target.value;
        this.setState({
            transactionForm: updatedtransactionForm,
        });
    };

    toggleNewtransactionForm = () => {
        this.setState({
            isAddTransaction: !this.state.isAddTransaction
        });
    };

    addNewTransaction = async(event) => {
        event.preventDefault();
        const { userId, accountId, account } = this.props
        try {
            let newForm = { ...this.state.transactionForm };
            newForm.user = userId;
            newForm.account = accountId;
            const balance = Number(account.balance)
            const amount = Number(newForm.amount)
            if ( newForm.action === 'Withdraw') {
                newForm.balance = balance - amount
            }
            else {
                newForm.balance = balance + amount
            }
            
            this.props.updateAccount(newForm.amount, newForm.action);
            await axios.post('/api/v1/transactions/', newForm, { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            this.props.fetchAccounts()
        }
        catch (error) {
            console.log(error)
        }
    }    


    render() {
        return (
            <Container fluid>
            { this.state.isAddTransaction
            ? <Form className='transactionForm' onSubmit={ this.addNewTransaction }>
                    <Form.Group>
                        <Form.Control as='select' name='action' onChange={ this.inputChange}>
                            <option value='Withdraw'>Withdraw</option>
                            <option value='Deposit'>Deposit</option>
                        </Form.Control>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='text' name='description' onChange={ this.inputChange} placeholder='Enter Transaction Description'/>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='number' name='amount' onChange={ this.inputChange} placeholder='Enter Amount'/>
                    </Form.Group>            
                    <Button type='submit'>
                        Create Transaction
                    </Button>
                </Form>
            : null
            }
                <br/>
                <Button onClick={ this.toggleNewtransactionForm }>
                    {this.state.isAddTransaction
                    ?'Cancel'
                    :'Create Transaction'
                    }
                </Button>
            </Container>
        )
    }
}
