import React, { Component } from 'react'

export default class TransactionDetails extends Component {
    render() {
        const { description, amount } = this.props.transaction
        return (
            <div>
                { description }
                { amount }
            </div>
        )
    }
}
