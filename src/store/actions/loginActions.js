import * as actionTypes from './actionTypes';
//import { authValidate } from '../../utility/utility';
import * as axios from '../../API/bsAxios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (type) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        loginType: type,
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.loginApi(username, password)
            .then(response => {
                console.log(response);
                const sessionId = response.data.session_id;
                const role = response.data.role;
                const user = response.data.user;
                const userId = response.data.user_id;
                document.cookie = `bs_cookie=${sessionId}`;                
                localStorage.setItem('role', role);
                localStorage.setItem('user', user);
                localStorage.setItem('userId', userId);
                dispatch(authSuccess(role));
            })
            .catch(error => {       
                console.log(error.response.data.reason);         
                dispatch(authFailed(error.response.data.reason));
            })
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}