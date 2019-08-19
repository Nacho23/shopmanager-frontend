import { createActions, createReducer } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    init: null,
    initSuccess: null,
    fetchInitialData: null,
    initFailure: ['error'],
    authenticated: null
})

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
    isInitiated: false,
    error: null,
    isConnected: false,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {

    [Types.INIT_SUCCESS]: (state) => {
        return {
            ...state,
            isInitiated: true,
            error: null,
        };
    },

    [Types.INIT_FAILURE]: (state, action) => {
        return {
            ...state,
            isInitiated: false,
            error: action.error,
        };
    },
});
