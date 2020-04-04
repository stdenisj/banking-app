import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'

export default class TransactionForm extends Component {
    state = {
        transactionForm: {
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
        try {
            const updatedtransactionForm = { ...this.state.transactionForm };
            updatedtransactionForm.user = this.props.userId;
            updatedtransactionForm.account = this.props.accountId;

            await axios.post('/api/v1/transactions/', updatedtransactionForm, { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            // this.props.fetchTransactions();
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
                            <option value='1'>Withdraw</option>
                            <option value='2'>Deposit</option>
                        </Form.Control>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='text' name='description' onChange={ this.inputChange} placeholder='Enter Transaction Name'/>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='number' name='amount' onChange={ this.inputChange} placeholder='Enter Amount'/>
                    </Form.Group>            
                    <Button variant="success" type='submit'>
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
