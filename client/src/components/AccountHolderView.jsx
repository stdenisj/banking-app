import React, { Component } from 'react'
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap'
import UserInfo from './UserInfo'
import AccountList from './AccountList'
import axios from 'axios'
import AccountForm from './AccountForm'

export default class AccountHolderView extends Component {
    state = {
        accounts: [],
        user: {}
    }

    componentDidMount(){
        this.fetchUser();
        this.fetchAccounts();
    }
    
    fetchUser = async() => {
        try {
            const res = await axios.get('/api/v1/users/', { headers: { "Authorization" : `Bearer ${this.props.token}`}});
            console.log(res)
            this.setState({ user: res.data[0] })
        }
        catch (error) {
            console.log(error);
        }
    }
    
        fetchAccounts = async() => {
            try {
                const res = await axios.get('/api/v1/accounts/', { headers: { "Authorization" : `Bearer ${this.props.token}`}});
                this.setState({ accounts: res.data})
            }
            catch (error) {
                console.log(error)
            }
        }
    
    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <UserInfo user={ this.state.user }/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AccountList accounts={ this.state.accounts } token={ this.props.token }/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AccountForm token={ this.props.token } userId={ this.props.user } fetchAccounts={ this.fetchAccounts } />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}
