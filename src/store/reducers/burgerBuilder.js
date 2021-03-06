import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients : null,
  totalPrice: 4.0,
  error: false
};

const INGREDIENT_PRICES = {
  salad : 0.4,
  meat : 1.6,
  cheese:1.2,
  bacon: 0.9 
}

const reducer = (state=initialState,action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName]+1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName]-1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error:false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error:true
      }
    default:
      return state;
  }
};

export default reducer;