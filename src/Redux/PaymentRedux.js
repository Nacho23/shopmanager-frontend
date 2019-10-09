import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchPayments: ['query'],
    fetchPaymentsSuccess: ['payments', 'pagination'],
    fetchPaymentsFailure: ['error'],
});


export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    payments: null,
    paginate: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch payments
    [Types.FETCH_PAYMENTS]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            payments: null,
        };
    },

    [Types.FETCH_PAYMENTS_SUCCESS]: (state, action) => {
        return {
            ...state,
            payments: action.payments,
            loading: false,
            error: null,
            paginate: action.pagination,
        };
    },

    [Types.FETCH_PAYMENTS_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            payments: null,
        };
    },
});
