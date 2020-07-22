import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    /*
    1) props.ingredients = {salad:a,meat:b,cheese:c,bacon:d} //an object
    2) Object.keys(props.ingredients) is the array [0:salad , 1:meat , 2:bacon , 3:cheese]
    3) In first map, igKey is string like.. 'salad' or 'meat' etc.
    4) [...Array(props.ingredients[igKey])] is the array of length 1
    5) ingredients is the array [0: "salad", 1: "meat", 2: "bacon", 3: "cheese"]
    6) reduce() is used to flatten the array, taked 2 parameters (previous value,current value)
    */
    let ingredients = Object.keys(props.ingredients)
        .map(igKey  => {
            return [...Array(props.ingredients[igKey])].map( (_,i) => {
                // console.log(igKey+i);
                return <BurgerIngredient key={igKey+i} type={igKey}/>
            } )
        })
        .reduce((arr,el) => {
            return  arr.concat(el);
        },[] );

        if(ingredients.length === 0 ) {
            ingredients = <p>Please start adding ingredients</p>
        }
        // console.log(ingredients);
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);