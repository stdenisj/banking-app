import React, { Component } from 'react'
import { Container, Col, Row, Button, Image} from 'react-bootstrap'
import logo from '../images/logo.png'

export default class UserInfo extends Component {
    render() {
        const { username, first_name } = this.props.user
        return (
            <Container fluid >
                <Row>
                    <Col className='headerbar'>
                        <h4>Hello { first_name === "" ? username : first_name }</h4>
                    </Col>
                    <Col className='headerbar'>
                        <Image src={ logo } width='125rem' />
                    </Col>
                    <Col className='headerbar'>
                        <a href='/' ><Button size='sm' onClick={ this.logout }>Logout</Button></a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
