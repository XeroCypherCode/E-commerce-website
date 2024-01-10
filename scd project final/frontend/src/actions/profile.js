import Cookies from 'js-cookie';
import axios from 'axios';
import {
    USERPROFILE_SUCCESS,
    USERPROFILE_FAIL,
    UPDATE_USERPROFILE_SUCCESS,
    UPDATE_USERPROFILE_FAIL
} from './type';

export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://127.0.0.1:8000/user_profiles/userprofile`, config);

        if (res.data.profile) {
            dispatch({
                type: USERPROFILE_SUCCESS,
                payload: res.data
            });
            
        } else {
            dispatch({
                type: USERPROFILE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: USERPROFILE_FAIL
        });
    }
};

export const updateuserprofile = (first_name, last_name, phone, address) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true,
        first_name,
        last_name,
        phone,
        address
    });

    try {
        const res = await axios.put(`http://127.0.0.1:8000/user_profiles/updateuser`, body, config);

        if (res.data.profile && res.data.email) {
            dispatch({
                type: UPDATE_USERPROFILE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_USERPROFILE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_USERPROFILE_FAIL
        });
    }
};