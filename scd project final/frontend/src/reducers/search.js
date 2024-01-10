import { PRODUCT_SEARCH_FAIL,PRODUCT_SEARCH_REQUEST,PRODUCT_SEARCH_SUCCESS } from './type';
const initialState = {
    products: [],
    loading: true,
    error: {},
 };
 
 export const productSearchReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_SEARCH_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_SEARCH_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_SEARCH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };