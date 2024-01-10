
import {
    REGISTER_SUCCESS,
    REGISTER_FAILS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAIL,
    EMAIL_EXISTS,
   
} from '../actions/type';

const initialState = {
    
    isAuthenticated: null,

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload
            }
        case AUTHENTICATION_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false, 
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case EMAIL_EXISTS:
        case REGISTER_FAILS:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case DELETE_ACCOUNT_FAIL: 
            return state
        default:
            return state
    };
};
