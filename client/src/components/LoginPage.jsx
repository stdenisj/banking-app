import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'


export default class LoginPage extends Component {
    render() {
        return (
            <Container fluid id="LoginPage">
                <Col>
                    <Row>
                        <Col>
                            <Container fluid id='welcome'>
                                <h1>Welcome To ...</h1>
                                <p>
                                The mobile banking app of the future. Login or signup to get started
                                </p>
                            </Container>
                            <LoginForm getToken={ this.props.getToken }/>
                        </Col>
                        <Col style={{ visibility: 'hidden' }}>
                        </Col>
                    </Row>
                </Col>
            </Container>
        )
    }
}
