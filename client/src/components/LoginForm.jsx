import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class LoginForm extends Component {
    state = {
        userForm: {
            username: '',
            password: '',
        },
        currentUser: {},
        isRedirect: false,
        isAddUesr: false,
    }

    loginUser = async(event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/user/login/', this.state.userForm);
            console.log(res);
            this.setState({ currentUser: res.data, isRedirect: true});
        }
        catch (error) {
            console.log(error);
        }
    }

    inputChange = (event) => {
        const changedInput = event.target.name;
        const updatedUserForm = { ...this.state.userForm };
        updatedUserForm[changedInput] = event.target.value;
        this.setState({
            userForm: updatedUserForm,
        });
    };

    toggleNewUserForm = () => {
        this.setState({
            isAddUesr: !this.state.isAddUesr
        });
    };

    
    render() {
        return (
            <Container id="LoginPage">
            {/* { this.state.isRedirect
                ? <Redirect to='/' user={this.state.currentUser}/>
                : null
                } */}
                
                <Form className='LoginForm' onSubmit={ this.state.isAddUesr ? this.addNewUser : this.loginUser }>
                    <Form.Group>
                        <Form.Control type='text' name='username' onChange={ this.inputChange} placeholder='Enter User Name'/>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='password' name='password' onChange={ this.inputChange} placeholder='Enter Password' />
                    </Form.Group>
                    {this.state.isAddUesr
                    ? <Form.Group>
                        <Form.Control type='text' name='name' onChange={ this.inputChange} placeholder='Enter Your Name'/>
                    </Form.Group> 
                    : null
                    }


                    <Button variant="success" type='submit'>
                        { this.state.isAddUesr
                            ? 'Create User'
                            : 'Log In' 
                        }
                    </Button>
                </Form>
                <Button  variant="success" onClick={ this.toggleNewUserForm }>
                    {this.state.isAddUesr
                    ?'Cancel'
                    :'Create Account'
                    }
                </Button>
            </Container>
        )
    }
}
