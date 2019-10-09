import { takeLatest, put, call, select } from 'redux-saga/effects';
import SaleActions, { SaleTypes } from '../Redux/SaleRedux';
import ApiResponseError from '../Services/ApiResponseError';

export function * getSales(api, action) {
    try {
        const response = yield call(api.getSaleCollection, action.query);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(SaleActions.fetchSalesSuccess(data.sales, data.pagination));
    } catch (e) {
        yield put(SaleActions.fetchSalesFailure(e));
    }
}

export function * createSale(api, action) {
    try {
        const response = yield call(api.postSaleCollection, action.sale);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(SaleActions.createSaleSuccess(data.sale));
    } catch (e) {
        yield put(SaleActions.createSaleFailure(e));
    }
}

export function * getSale(api, action) {
    try {
        const response = yield call(api.getSaleResource, action.sale_id);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }
        const data = response.data.data;

        yield put(SaleActions.fetchSaleSuccess(data.sale));
    } catch (e) {
        yield put(SaleActions.fetchSaleFailure(e));
    }
}

export function * updateSale(api, action) {
    try {
        const response = yield call(api.patchSaleResource, action.sale_id, action.sale);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(SaleActions.updateSaleSuccess(data.sale));
    } catch (e) {
        yield put(SaleActions.updateSaleFailure(e));
    }
}

export function * deleteSale(api, action) {
    try {
        const response = yield call(api.deleteSaleResource, action.sale_id );
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        yield put(SaleActions.deleteSaleSuccess());
    } catch (e) {
        yield put(SaleActions.deleteSaleFailure(e));
    }
}

export function * watchSale(api) {
    yield takeLatest(SaleTypes.FETCH_SALES, getSales, api);
    yield takeLatest(SaleTypes.CREATE_SALE, createSale, api);
    yield takeLatest(SaleTypes.FETCH_SALE, getSale, api);
    yield takeLatest(SaleTypes.UPDATE_SALE, updateSale, api);
    yield takeLatest(SaleTypes.DELETE_SALE, deleteSale, api);
}
