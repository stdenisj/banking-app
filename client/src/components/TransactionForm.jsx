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
        const { action, amount } = this.state.transactionForm
        if (( action === 'Withdraw' ) && ( amount > account.balance )) {
            return  alert('Insufficent funds')
        }
        try {
            let newForm = { ...this.state.transactionForm };
            newForm.user = userId;
            newForm.account = accountId;
            const formBalance = Number(account.balance)
            const formAmount = Number(newForm.amount)
            

            if ( newForm.action === 'Withdraw') {
                newForm.balance = formBalance - formAmount
            }
            else {
                newForm.balance = formBalance + formAmount
            }
            this.props.updateAccount(newForm.amount, newForm.action);
            await axios.post('/api/v1/transactions/', newForm, { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            this.toggleNewtransactionForm();
            this.props.fetchAccounts();
        }
        catch (error) {
            console.log(error)
        }
    }    

    removeAccount = async(event) => {
        event.preventDefault();
        try {
            await axios.delete(`/api/v1/accounts/${ this.props.accountId }/`, { headers: { "Authorization" : `Bearer ${this.props.token}`}})
            alert('Account deleted')
            this.props.fetchAccounts();
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
                    <Button type='submit' size='sm' >
                        Create Transaction
                    </Button>
                <Button onClick={ this.toggleNewtransactionForm } size='sm' >
                    Cancel
                </Button>
                </Form>
            :   <Button onClick={ this.toggleNewtransactionForm } size='sm' >
                    Add Transaction
                </Button>
            }
            { this.props.account.balance === 0
                ? <Button onClick={ this.removeAccount } size='sm' variant='danger'>Delete Account</Button>
                : null
            }
            </Container>
        )
    }
}
