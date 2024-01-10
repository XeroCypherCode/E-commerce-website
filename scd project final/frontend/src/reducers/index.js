import { combineReducers } from "redux";
import auth from './auth';
import profile from './profile';
import product from "./product";
import cart from "./cart";
export default combineReducers ({
    auth:auth,
    profile:profile,
    product:product,
    cart:cart
}
);
