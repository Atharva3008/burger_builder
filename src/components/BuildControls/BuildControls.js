import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <div><p>Current Price : <strong>{props.total.toFixed(2)}</strong></p></div>
        {controls.map(ctrl => {
            return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        })}
        <button 
            className={classes.Check} 
            disabled={!props.purchasable} 
            onClick={props.ordered}>Check Out
        </button>
    </div>    
)

export default buildControls;
