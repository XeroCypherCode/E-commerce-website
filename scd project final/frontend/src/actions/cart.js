
import axios from "axios";
import Cookies from 'js-cookie';
import { ADD_TO_CART,VIEW_CART,REMOVE_FROM_CART } from "./type";
import { useSelector } from "react-redux";


export const addToCart = ( productId, Quantity)  => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
     
       try {
        console.log({ productId, Quantity });
           const response = await axios.post('http://127.0.0.1:8000/cart/add', {  product_id:productId, quantity:Quantity },config);
           if(response.data.added){
           dispatch({
             type: ADD_TO_CART, 
             payload: response.data ,
             
            });
            
        }
       } catch (error) {
           console.log(error);
       }
   };


export const removeFromCart = (userId, productId) => async dispatch =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
       try {
           const response = await axios.delete(`http://127.0.0.1:8000/cart/remove?userId=${userId}`,{ product_id:productId},config);
           dispatch({ type: REMOVE_FROM_CART, payload: response.data });
       } catch (error) {
           console.log(error);
       }
   };



export const viewCart = (userId) => async dispatch => {
   const config = {
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'X-CSRFToken': Cookies.get('csrftoken')
       }
   };

   try {
       const response = await axios.get(`http://127.0.0.1:8000/cart/viewcart?userId=${userId}`, config);
       dispatch({
           type: VIEW_CART,
           payload: response.data
       });
   } catch (error) {
       console.log(error);
   }
};