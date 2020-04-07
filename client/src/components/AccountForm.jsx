import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
export default class AccountForm extends Component {
    state = {
        accountForm: {
            title: '',
        },
        currentUser: {},
        isRedirect: false,
        isAddAccount: false,
    }

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedAccountForm = { ...this.state.accountForm };
        updatedAccountForm[changedInput] = event.target.value;
        this.setState({
            accountForm: updatedAccountForm,
        });
    };

    toggleNewAccountForm = () => {
        this.setState({
            isAddAccount: !this.state.isAddAccount
        });
    };

    addNewAccount = async(event) => {
        event.preventDefault();
        try {
            const updatedAccountForm = { ...this.state.accountForm };
            updatedAccountForm.user = this.props.userId;
            await axios.post('/api/v1/accounts/', updatedAccountForm, { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            this.props.fetchAccounts();
            this.toggleNewAccountForm();
        }
        catch (error) {
            console.log(error)
        }
    }    


    render() {
        return (
            <Container fluid>
            { this.state.isAddAccount
            ? <Form className='AccountForm' onSubmit={ this.addNewAccount }>
                    <Form.Group>
                        <Form.Control type='text' name='title' onChange={ this.inputChange} placeholder='Enter Account Name'/>
                    </Form.Group>            
                    <Button type='submit' size='sm' >
                        Create Account
                    </Button>
                    <Button onClick={ this.toggleNewAccountForm } size='sm' >
                        Cancel
                    </Button>
                </Form>
            :   <Button onClick={ this.toggleNewAccountForm } size='sm' >
                    Add Account
                </Button>
            }

            </Container>
        )
    }
}
