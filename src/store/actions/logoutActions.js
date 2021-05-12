import * as actionTypes from './actionTypes';
import * as axios from '../../API/bsAxios';

export const logout = () => {
    return dispatch => {
        console.log('logout');
        axios.bsLogout()
            .then(response => {
                console.log(response);
                logoutCleanUp();
            })
            .catch(error => {
                console.log(error);
                logoutCleanUp();
            });
        dispatch(logoutAction);

    }
};


export const logoutAction = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


const logoutCleanUp = () => {
    document.cookie = `bs_cookie=undefined`;
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
}