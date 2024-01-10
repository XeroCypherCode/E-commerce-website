import {
    USERPROFILE_SUCCESS,
    USERPROFILE_FAIL,
    UPDATE_USERPROFILE_SUCCESS,
    UPDATE_USERPROFILE_FAIL
} from '../actions/type';

const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: ''
 
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case USERPROFILE_SUCCESS:
        case UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                email: payload.profile.email,
                first_name: payload.profile.first_name,
                last_name: payload.profile.last_name,
                phone: payload.profile.phone,
                address: payload.profile.address,
                
               
            }
        case USERPROFILE_FAIL:
            return {
                ...state,
                email: '',
                first_name: '',
                last_name: '',
                phone: '',
                address: ''
            }
        case UPDATE_USERPROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};