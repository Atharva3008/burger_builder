import React,{ Component } from "react";
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Auxa from '../../hoc/Auxa';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state ={
        purchasing: false
    }
    
    componentDidMount = () => {
        this.props.onInitIngredients();
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
        console.log("ATHARVA DESHPANDE");
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
        let burger = this.props.error? <p>Ingredients can't be loaded!</p>: <Spinner/>;
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
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));