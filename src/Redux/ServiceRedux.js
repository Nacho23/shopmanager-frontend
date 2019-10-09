import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchServices: ['query'],
    fetchServicesSuccess: ['services'],
    fetchServicesFailure: ['error'],

    createService: ['service'],
    createServiceSuccess: ['service'],
    createServiceFailure: ['error'],

    fetchService: ['service_id'],
    fetchServiceSuccess: ['service'],
    fetchServiceFailure: ['error'],

    updateService: ['service_id', 'service'],
    updateServiceSuccess: ['service'],
    updateServiceFailure: ['error'],

    deleteService: ['service_id'],
    deleteServiceSuccess: [],
    deleteServiceFailure: ['error'],
});


export const ServiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    services: null,
    service: null,
    serviceCreated: null,
    serviceFinded: null,
    serviceService: null,
    serviceToEdit: null,
    serviceUpdated: null,
    serviceDeleted: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch account plan actions
    [Types.FETCH_SERVICES]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            service: null,
            services: null,
            serviceToEdit: null,
            serviceFinded: null,
        };
    },

    [Types.FETCH_SERVICES_SUCCESS]: (state, action) => {
        return {
            ...state,
            services: action.services,
            loading: false,
            error: null,
            service: null,
            serviceToEdit: null,
            serviceFinded: true,
        };
    },

    [Types.FETCH_SERVICES_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            service: null,
            services: [],
            serviceToEdit: null,
            serviceFinded: null,
        };
    },

    // Create an account plan
    [Types.CREATE_SERVICE]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            service: null,
            serviceToEdit: null,
            serviceCreated: null,
        };
    },

    [Types.CREATE_SERVICE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            service: action.service,
            serviceCreated: true,
            error: null,
            serviceToEdit: null,
        };
    },

    [Types.CREATE_SERVICE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            service: null,
            serviceToEdit: null,
            serviceCreated: null,
        };
    },

    // Fetch a single account plan
    [Types.FETCH_SERVICE]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            service: null,
            serviceToEdit: null,
        };
    },

    [Types.FETCH_SERVICE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            service: null,
            serviceToEdit: action.service,
        };
    },

    [Types.FETCH_SERVICE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            service: null,
            serviceToEdit: null,
        };
    },

    // Update an account plan
    [Types.UPDATE_SERVICE]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            service: null,
            serviceUpdated: null,
        };
    },

    [Types.UPDATE_SERVICE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            service: null,
            error: null,
            serviceUpdated: true,
        };
    },

    [Types.UPDATE_SERVICE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            service: null,
            serviceUpdated: null,
        };
    },

    // Delete an existing account plan
    [Types.DELETE_SERVICE]: (state) => {
        return {
            ...state,
            loading: true,
            serviceDeleted: null,
            error: null,
        };
    },

    [Types.DELETE_SERVICE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            serviceDeleted: true,
            error: null,
        };
    },

    [Types.DELETE_SERVICE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            serviceDeleted: null,
            error: action.error,
        };
    },
});
