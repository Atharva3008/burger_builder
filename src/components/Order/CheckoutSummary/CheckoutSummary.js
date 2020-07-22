import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './CheckoutSummary.module.css';
const CheckoutSummary = (props) => {
    return (
        <div className={Classes.CheckoutSummary}>
            <h1>
                We hope it tastes well!
            </h1>
            <div style={{Width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.onCheckoutCancelled}>Cancel</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued} >Continue</Button>
        </div>
    );
}

export default CheckoutSummary;