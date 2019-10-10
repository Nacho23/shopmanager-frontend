import { find, assign, get } from 'lodash';
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchSales: ['query'],
    fetchSalesSuccess: ['sales', 'pagination'],
    fetchSalesFailure: ['error'],

    createSale: ['sale'],
    createSaleSuccess: ['sale'],
    createSaleFailure: ['error'],

    fetchSale: ['sale_id'],
    fetchSaleSuccess: ['sale'],
    fetchSaleFailure: ['error'],

    updateSale: ['sale_id', 'sale'],
    updateSaleSuccess: ['sale'],
    updateSaleFailure: ['error'],

    deleteSale: ['sale_id'],
    deleteSaleSuccess: [],
    deleteSaleFailure: ['error'],

    fetchDetailsSale: ['year'],
    fetchDetailsSaleSuccess: ['details'],
    fetchDetailsSaleFailure: ['error'],
});


export const SaleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    loading: false,
    error: null,
    sales: null,
    sale: null,
    saleCreated: null,
    saleToEdit: null,
    saleUpdated: null,
    saleDeleted: null,
    saleDetails: null,
    paginate: null,
})

const resetState = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {

    // Fetch sales
    [Types.FETCH_SALES]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            sale: null,
            sales: null,
            saleToEdit: null,
        };
    },

    [Types.FETCH_SALES_SUCCESS]: (state, action) => {
        return {
            ...state,
            sales: action.sales,
            loading: false,
            error: null,
            sale: null,
            saleToEdit: null,
            paginate: action.pagination,
        };
    },

    [Types.FETCH_SALES_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            sale: null,
            sales: null,
            saleToEdit: null,
        };
    },

    // Create a sale
    [Types.CREATE_SALE]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            sale: null,
            saleToEdit: null,
            saleCreated: null,
        };
    },

    [Types.CREATE_SALE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            sale: action.sale,
            saleCreated: true,
            error: null,
            saleToEdit: null,
        };
    },

    [Types.CREATE_SALE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            sale: null,
            saleToEdit: null,
            saleCreated: null,
        };
    },

    // Fetch a sale
    [Types.FETCH_SALE]: (state) => {
        return {
            ...state,
            loading: true,
            error: null,
            sale: null,
            saleToEdit: null,
        };
    },

    [Types.FETCH_SALE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: null,
            sale: null,
            saleToEdit: action.sale,
        };
    },

    [Types.FETCH_SALE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            sale: null,
            saleToEdit: null,
        };
    },

    // Update a sale
    [Types.UPDATE_SALE]: (state, action) => {
        return {
            ...state,
            loading: true,
            error: null,
            sale: null,
            saleUpdated: null,
        };
    },

    [Types.UPDATE_SALE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            sale: null,
            error: null,
            saleUpdated: true,
        };
    },

    [Types.UPDATE_SALE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            sale: null,
            saleUpdated: null,
        };
    },

    // Delete an existing sale
    [Types.DELETE_SALE]: (state) => {
        return {
            ...state,
            loading: true,
            saleDeleted: null,
            error: null,
        };
    },

    [Types.DELETE_SALE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            saleDeleted: true,
            error: null,
        };
    },

    [Types.DELETE_SALE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            saleDeleted: null,
            error: action.error,
        };
    },

    // Get details sales
    [Types.FETCH_DETAILS_SALE]: (state) => {
        return {
            ...state,
            loading: true,
            saleDetails: null,
            error: null,
        };
    },

    [Types.FETCH_DETAILS_SALE_SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            saleDetails: action.details,
            error: null,
        };
    },

    [Types.FETCH_DETAILS_SALE_FAILURE]: (state, action) => {
        return {
            ...state,
            loading: false,
            saleDetails: null,
            error: action.error,
        };
    },
});
