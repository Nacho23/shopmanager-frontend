import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchProviders: ['query'],
    fetchProvidersSuccess: ['providers'],
    fetchProvidersFailure: ['error'],

    createProvider: ['provider'],
    createProviderSuccess: ['provider'],
    createProviderFailure: ['error'],

    fetchProvider: ['provider_id'],
    fetchProviderSuccess: ['provider'],
    fetchProviderFailure: ['error'],

    updateProvider: ['provider_id', 'provider'],
    updateProviderSuccess: ['provider'],
    updateProviderFailure: ['error'],

    deleteProvider: ['provider_id'],
    deleteProviderSuccess: [],
    deleteProviderFailure: ['error'],
});


export const ProviderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    providers: null,
    provider: null,
    providerCreated: null,
    providerProvider: null,
    providerToEdit: null,
    providerUpdated: null,
    providerDeleted: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch account plan actions
    [Types.FETCH_PROVIDERS]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            provider: null,
            providers: null,
            providerToEdit: null,
        };
    },

    [Types.FETCH_PROVIDERS_SUCCESS]: (state, action) => {
        return {
            ...state,
            providers: action.providers,
            loading: false,
            error: null,
            provider: null,
            providerToEdit: null,
        };
    },

    [Types.FETCH_PROVIDERS_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            provider: null,
            providers: [],
            providerToEdit: null,
        };
    },

    // Create an account plan
    [Types.CREATE_PROVIDER]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            provider: null,
            providerToEdit: null,
            providerCreated: null,
        };
    },

    [Types.CREATE_PROVIDER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            provider: action.provider,
            providerCreated: true,
            error: null,
            providerToEdit: null,
        };
    },

    [Types.CREATE_PROVIDER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            provider: null,
            providerToEdit: null,
            providerCreated: null,
        };
    },

    // Fetch a single account plan
    [Types.FETCH_PROVIDER]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            provider: null,
            providerToEdit: null,
        };
    },

    [Types.FETCH_PROVIDER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            provider: null,
            providerToEdit: action.provider,
        };
    },

    [Types.FETCH_PROVIDER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            provider: null,
            providerToEdit: null,
        };
    },

    // Update an account plan
    [Types.UPDATE_PROVIDER]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            provider: null,
            providerUpdated: null,
        };
    },

    [Types.UPDATE_PROVIDER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            provider: null,
            error: null,
            providerUpdated: true,
        };
    },

    [Types.UPDATE_PROVIDER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            provider: null,
            providerUpdated: null,
        };
    },

    // Delete an existing account plan
    [Types.DELETE_PROVIDER]: (state) => {
        return {
            ...state,
            loading: true,
            providerDeleted: null,
            error: null,
        };
    },

    [Types.DELETE_PROVIDER_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            providerDeleted: true,
            error: null,
        };
    },

    [Types.DELETE_PROVIDER_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            providerDeleted: null,
            error: action.error,
        };
    },
});
