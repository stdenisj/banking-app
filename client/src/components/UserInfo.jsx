import React, { Component } from 'react'
import { Container, Col, Row,Button} from 'react-bootstrap'


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
                        <h1>Banking Logo</h1>
                    </Col>
                    <Col className='headerbar'>
                        <a href='/' ><Button size='sm' onclick={ this.logout }>Logout</Button></a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
