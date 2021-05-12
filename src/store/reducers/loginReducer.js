import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';


const inititalState = {
    error: null,
    loading: false,
    login: false,
    loginType: null,
    authRedirectPath: '/',
    logout:false
}


const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true, logout: false });
};

const logout = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        login: false,
        loginType: null,
        authRedirectPath: '/',
        logout:true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        login: true,
        loginType: action.loginType,
        authRedirectPath: '/home'
    });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        login: false,
        authRedirectPath: '/'
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        login: false,
        authRedirectPath: '/'
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.LOGOUT: return logout(state, action)
        default: return state
    }

};

export default reducer;