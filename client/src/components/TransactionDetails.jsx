import React, { Component } from 'react'
import { Card, Row, Col} from 'react-bootstrap'

export default class TransactionDetails extends Component {
    render() {
        let balance = this.props.account.balance
        const { date, action, description, amount } = this.props.transaction
        return (
            // <Card>
            //     <Row>
            //         <Col>  
            //             { action }:              
            //         </Col>
            //             ${ amount } 
            //         <Col>                
            //         </Col>
            //         <Col>                
            //             { description }
            //         </Col>
            //     </Row>
            // </Card>
            <tr>
                <td>{ date }</td>
                <td>{ description }</td>
                <td>{ action === 'Deposit' ? amount : null } </td>
                <td>{ action === 'Withdraw' ? amount : null } </td>
                <td>{ balance += amount }</td>
            </tr>
        )
    }
}