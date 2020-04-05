import React, { Component } from 'react'

export default class TransactionDetails extends Component {
    render() {
        const { date, action, description, amount, balance } = this.props.transaction
        return (
            <tr>
                <td>{ date }</td>
                <td>{ description }</td>
                <td>{ action === 'Deposit' ? `$${amount}` : null } </td>
                <td style={{ color: 'red' }}>{ action === 'Withdraw' ? `-$${amount}` : null } </td>
                <td> ${ balance } </td>
            </tr>
        )
    }
}