import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchCustomers: ['query'],
    fetchCustomersSuccess: ['customers'],
    fetchCustomersFailure: ['error'],

    createCustomer: ['customer'],
    createCustomerSuccess: ['customer'],
    createCustomerFailure: ['error'],

    fetchCustomer: ['customer_id'],
    fetchCustomerSuccess: ['customer'],
    fetchCustomerFailure: ['error'],

    updateCustomer: ['customer_id', 'customer'],
    updateCustomerSuccess: ['customer'],
    updateCustomerFailure: ['error'],

    deleteCustomer: ['customer_id'],
    deleteCustomerSuccess: [],
    deleteCustomerFailure: ['error'],
});


export const CustomerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    customers: [],
    customer: null,
    customerFinded: null,
    customerCreated: null,
    customerCustomer: null,
    customerToEdit: null,
    customerUpdated: null,
    customerDeleted: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch account plan actions
    [Types.FETCH_CUSTOMERS]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            customer: null,
            customers: [],
            customerToEdit: null,
            customerFinded: null,
        };
    },

    [Types.FETCH_CUSTOMERS_SUCCESS]: (state, action) => {
        return {
            ...state,
            customers: action.customers,
            loading: false,
            error: null,
            customer: null,
            customerToEdit: null,
            customerFinded: true,
        };
    },

    [Types.FETCH_CUSTOMERS_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            customer: null,
            customers: [],
            customerToEdit: null,
            customerFinded: null,
        };
    },

    // Create an account plan
    [Types.CREATE_CUSTOMER]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            customer: null,
            customerToEdit: null,
            customerCreated: null,
        };
    },

    [Types.CREATE_CUSTOMER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            customer: action.customer,
            customerCreated: true,
            error: null,
            customerToEdit: null,
        };
    },

    [Types.CREATE_CUSTOMER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            customer: null,
            customerToEdit: null,
            customerCreated: null,
        };
    },

    // Fetch a single account plan
    [Types.FETCH_CUSTOMER]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            customer: null,
            customerToEdit: null,
        };
    },

    [Types.FETCH_CUSTOMER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            customer: null,
            customerToEdit: action.customer,
        };
    },

    [Types.FETCH_CUSTOMER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            customer: null,
            customerToEdit: null,
        };
    },

    // Update an account plan
    [Types.UPDATE_CUSTOMER]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            customer: null,
            customerUpdated: null,
        };
    },

    [Types.UPDATE_CUSTOMER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            customer: null,
            error: null,
            customerUpdated: true,
        };
    },

    [Types.UPDATE_CUSTOMER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            customer: null,
            customerUpdated: null,
        };
    },

    // Delete an existing account plan
    [Types.DELETE_CUSTOMER]: (state) => {
        return {
            ...state,
            loading: true,
            customerDeleted: null,
            error: null,
        };
    },

    [Types.DELETE_CUSTOMER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            customerDeleted: true,
            error: null,
        };
    },

    [Types.DELETE_CUSTOMER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            customerDeleted: null,
            error: action.error,
        };
    },
});
