import axios from 'axios';
import Cookies from 'js-cookie';
import {EMAIL_EXISTS,
        REGISTER_SUCCESS,
        REGISTER_FAILS ,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT_SUCCESS,
        LOGOUT_FAIL,
        AUTHENTICATION_SUCCESS,
        AUTHENTICATION_FAIL,
        DELETE_ACCOUNT_SUCCESS,
        DELETE_ACCOUNT_FAIL
        } from './type';
import { load_user } from './profile';
import { addToCart } from './cart';
import { useNavigate } from 'react-router-dom';
export const checkauthentication = () => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  };

  try {
      const res = await axios.get(`http://127.0.0.1:8000/accounts/authenticate`, config);

      if (res.data.error || res.data.isAuthenticated === 'error') {
          dispatch({
              type: AUTHENTICATION_FAIL,
              payload: false
          });
      }
      else if (res.data.isAuthenticated === 'success') {
          dispatch({
              type: AUTHENTICATION_SUCCESS,
              payload: true
          });
      }
      else {
          dispatch({
              type: AUTHENTICATION_FAIL,
              payload: false
          });
      }
  } catch(err) {
      dispatch({
          type: AUTHENTICATION_FAIL,
          payload: false
      });
  }
};

export const login = (email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/login`, body, config);
        
        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(load_user());

            }
           
        else {
            dispatch({
                type: LOGIN_FAIL,
            });
            alert('email or password incorrect')
        }
    } 
    catch(err) {
        dispatch({
            type: LOGIN_FAIL        
        });
    }

  };

  
export const register = (email, password, re_password) => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
      }
  };

  const body = JSON.stringify({ email, password, re_password });

  try {
      const res = await axios.post(`http://127.0.0.1:8000/accounts/register`, body, config);

      if (res.data.error) {
          dispatch({
              type: REGISTER_FAILS
          });
          //alert('Passwords do not match');
          return;
      }  
    else if (res.data.exists) {
        dispatch({
            type: EMAIL_EXISTS
        });
        alert('email already exists !');
        return;
    }  
    else if (res.data.errorformate) {
        dispatch({
            type: REGISTER_FAILS
        });
        return 'errorformate';
    }  
    else{
          dispatch({
              type: REGISTER_SUCCESS
          });
          return 'success';
      }
  } catch (err) {
      dispatch({
          type: REGISTER_FAILS
      });
  }
};

export const logout = () => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
      }
  };

  const body = JSON.stringify({
      'withCredentials': true
  });

  try {
      const res = await axios.post(`http://127.0.0.1:8000/accounts/logout`, body, config);

      if (res.data.success) {
          dispatch({
              type: LOGOUT_SUCCESS,  
          });
          
      } else {
          dispatch({
              type: LOGOUT_FAIL
          });
      }
  } catch(err) {
      dispatch({
          type: LOGOUT_FAIL
      });
  }
};

export const delete_account = () => async dispatch => {
  const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
      }
  };

  const body = JSON.stringify({
      'withCredentials': true
  });

  try {
      const res = await axios.delete(`http://127.0.0.1:8000/accounts/deleteAccount`, config, body);

      if (res.data.success) {
          dispatch({
              type: DELETE_ACCOUNT_SUCCESS
          });
      } else {
          dispatch({
              type: DELETE_ACCOUNT_FAIL
          });
      }
  } catch (err) {
      dispatch({
          type: DELETE_ACCOUNT_FAIL
      });
  }
};