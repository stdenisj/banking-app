import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class UserInfo extends Component {
    render() {
        const { username } = this.props.user
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>

                <h1>User: { username }</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                </Card.Body>
            </Card>
        )
    }
}
