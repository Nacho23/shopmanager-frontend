import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    generate: ['report', 'data'],
    generateSuccess: [],
    generateFailure: ['error'],
});


export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    generated: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch payments
    [Types.GENERATE]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            generated: null,
        };
    },

    [Types.GENERATE_SUCCESS]: (state, action) => {
        return {
            ...state,
            generated: true,
            loading: false,
            error: null,
        };
    },

    [Types.GENERATE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            generated: null,
        };
    },
});
