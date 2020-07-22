import React from 'react';
import Classes from './Order.module.css';
const order = (props) => {
    const ingredients = [];
    
    for( let ing in props.ingredients) {
        ingredients.push(
            {
                name: ing,
                amount: props.ingredients[ing]
            }
        );
    }

    const ingout = ingredients.map(ig => {
    return<span 
            key={ig.name}
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border: '1px solid #ccc',
                padding:'5px'
            }}>{ig.name} ({ig.amount})</span>
    })
    return(
        <div className={Classes.Order}>
            <p>Ingredients: {ingout}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;