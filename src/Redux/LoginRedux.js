import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

    login: ['email', 'password'],
    loginSuccess: ['auth'],
    loginFailure: ['error'],

    checkAuth: null,
    checkAuthSuccess: ['token'],
    checkAuthFailure: ['error'],

    logout: null,
    logoutSuccess: null,
    logoutFailure: ['error'],

    changePassword: ['data'],
    changePasswordSuccess: [],
    changePasswordFailure: ['error'],
});


export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    auth: null,
    authSuccess: false,
    logoutSuccess: null,
    tokenValidated: null,
    passwordChanged: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Create an Auth
    [Types.LOGIN]: (state, action) => {
        return {
            ...state,
            loading : true,
            error: null,
            auth: null,
            authSuccess: false,
            logoutSuccess: null,
            tokenValidated: null,
        };
    },

    [Types.LOGIN_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            auth: action.auth,
            error: null,
            authSuccess: true,
            logoutSuccess: null,
            tokenValidated: null,
        };
    },

    [Types.LOGIN_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            auth: null,
            authSuccess: false,
            logoutSuccess: null,
            tokenValidated: null,
        };
    },

    // Fetch a single auth
    [Types.CHECK_AUTH]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            auth: null,
            tokenValidated: null,
            logoutSuccess: null,
        };
    },

    [Types.CHECK_AUTH_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            auth: null,
            logoutSuccess: null,
            tokenValidated: true,
            token: action.token,
        };
    },

    [Types.CHECK_AUTH_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            auth: null,
            tokenValidated: false,
            logoutSuccess: null,
        };
    },

    // Delete an existing token
    [Types.LOGOUT]: (state) => {
        return {
            ...state,
            loading: true,
            logoutSuccess: null,
            tokenValidated: null,
        };
    },

    [Types.LOGOUT_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            logoutSuccess: true,
            tokenValidated: null,
        };
    },

    [Types.LOGOUT_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            logoutSuccess: null,
            tokenValidated: null,
        };
    },

    // Change password
    [Types.CHANGE_PASSWORD]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            passwordChanged: null,
        };
    },

    [Types.CHANGE_PASSWORD_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            passwordChanged: true,
        };
    },

    [Types.CHANGE_PASSWORD_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            passwordChanged: null,
        };
    },
});
