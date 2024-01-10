import { ADD_TO_CART,VIEW_CART,REMOVE_FROM_CART } from "../actions/type";
const initialState = {
    cartItems: [],
    message: '',
 };
 
 export default function cart(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                message: 'Product added to cart successfully',
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
                message: 'Product removed from cart successfully',
            };
        case VIEW_CART:
            return {
                ...state,
                cartItems: action.payload,
            };
        default:
            return state;
    }
 }