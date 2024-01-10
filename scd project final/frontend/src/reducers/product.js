import { PRODUCT_SUCCESS } from '../actions/type';

const initialState = {
    product: {},
    loading: true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false
                
            };
        default:
            return state;
    }
}