import React,{ Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Auxa from '../../hoc/Auxa';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state ={
        purchasing: false,
        loading: false,
        error:false
    }
    
    componentDidMount = () => {
        // axios.get('https://react-my-burger-95387.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error:true});
        //     });
    }
    
    togglePurchasable = (ingre) => {
        let sum = Object.keys(ingre).map((key) => {
            return ingre[key];
        })
        .reduce((sum,el)=> {
            return sum+el;
        },0);
        return sum > 0;
    }
    purchase = () => {
        this.setState({purchasing:true});
    }
    closed = () => {
        this.setState({purchasing:false})
    }
    purchaseContinue = () => {
        this.props.history.push('./checkout');
    }

    render() {
        const disabled = {
            ...this.props.ings 
        };
        for(let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner/>;
        if(this.props.ings!==null) {
            burger = (<Auxa>
                <Burger ingredients={this.props.ings}/>
                < BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disabled={disabled}
                    total={this.props.price}
                    purchasable={this.togglePurchasable(this.props.ings)}
                    ordered={this.purchase} />
            </Auxa>);
            orderSummary =  <OrderSummary ingredients={this.props.ings}
            closed={this.closed}
            purchaseContinue={this.purchaseContinue}
            price = {this.props.price}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return(
            <Auxa>
                <Modal show={this.state.purchasing}
                    closed={this.closed}>
                   {orderSummary}
                </Modal>
                {burger}
            </Auxa>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));