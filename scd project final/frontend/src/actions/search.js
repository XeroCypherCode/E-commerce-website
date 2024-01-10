import axios from 'axios';
import {PRODUCT_SEARCH_SUCCESS,PRODUCT_SEARCH_REQUEST,PRODUCT_SEARCH_FAIL} from './type';

export const searchProducts = (keyword) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SEARCH_REQUEST });
  
      const { data } = await axios.get(`http://localhost:8000/products/search/${keyword}/`);
  
      dispatch({
        type: PRODUCT_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_SEARCH_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };