import axios from 'axios';
import { PRODUCT_SUCCESS } from './type';

export const getProduct = (category_slug, product_slug) => dispatch => {
    console.log(category_slug)
    console.log(product_slug)
    axios.get(`http://127.0.0.1:8000/products/productsdetail/${category_slug}/${product_slug}/`)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: PRODUCT_SUCCESS,
                payload: res.data.product 
                
            });
        })
        .catch(err => console.log(err));
};