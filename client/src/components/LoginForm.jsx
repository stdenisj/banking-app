import React, { Component } from 'react'
import axios from 'axios'
import { Container, Form, Button, } from 'react-bootstrap'
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
        if (this.state.isAddUesr === false) {
            event.preventDefault()
        }
        try {
            const res = await axios.post('/api/user/login/', this.state.userForm);
            this.props.getToken(res.data);
            this.setState({ isRedirect: true });
        }
        catch (error) {
            console.log(error);
        }
    }

    addNewUser = async(event) => {
        event.preventDefault()
        try {
            await axios.post('/api/user/signup/', this.state.userForm);
            this.loginUser(event)
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
            <Container fluid>
            { this.state.isRedirect
                ? <Redirect to='/account' user={ this.state.currentUser }/>
                : null
                }
                
                <Form 
                    className='LoginForm'
                    onSubmit={ this.state.isAddUesr ? this.addNewUser : this.loginUser }
                    >
                    <Form.Group>
                        <Form.Control type='text' name='username' onChange={ this.inputChange} placeholder='Enter User Name'/>
                    </Form.Group>            
                    <Form.Group>
                        <Form.Control type='password' name='password' onChange={ this.inputChange} placeholder='Enter Password' />
                    </Form.Group>
                    {   this.state.isAddUesr
                        ? <div>
                            <Form.Group>
                                <Form.Control type='text' name='first_name' onChange={ this.inputChange} placeholder='Enter Your First Name'/>
                            </Form.Group>       
                            <Form.Group>
                                <Form.Control type='text' name='last_name' onChange={ this.inputChange} placeholder='Enter Your Last Name'/>
                            </Form.Group>       
                            <Form.Group>
                                <Form.Control type='email' name='email' onChange={ this.inputChange} placeholder='Enter Your Email Address'/>
                            </Form.Group>       
                        </div>
                        : null
                    }
                    <Button 
                        type='submit'
                        style={{ margin: '20px' }}>
                                { this.state.isAddUesr
                                    ? 'Create User'
                                    : 'Log In' 
                                }
                    </Button>
                    <Button 
                        onClick={ this.toggleNewUserForm }
                        style={{ margin: '20px' }}>
                                {this.state.isAddUesr
                                ?'Cancel'
                                :'Create Account'
                            }
                    </Button>    
                </Form>
            </Container>
        )
    }
}
