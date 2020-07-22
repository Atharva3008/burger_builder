import React, { Component } from 'react';
import  Auxa from '../../../hoc/Auxa';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {
    conponentWillUpdate() {
        console.log('OrderSummary will update');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return <li key={key}><span style={{textTransform:'capitalize'}}>{key}</span>: {this.props.ingredients[key]}</li>
        });
        return (
            <Auxa>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.closed}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxa>
        );
    }
} 

export default OrderSummary;