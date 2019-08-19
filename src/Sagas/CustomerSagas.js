import { takeLatest, put, call, select } from 'redux-saga/effects';
import CustomerActions, { CustomerTypes } from '../Redux/CustomerRedux';
import ApiResponseError from '../Services/ApiResponseError';

/**
 * Get the entuty account transactions
 * @param Api    api
 * @param Action action
 */
export function * getCustomers(api, action) {
    try {
        const response = yield call(api.getCustomerCollection, action.query);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(CustomerActions.fetchCustomersSuccess(data.customers));
    } catch (e) {
        yield put(CustomerActions.fetchCustomersFailure(e));
    }
}

export function * createCustomer(api, action) {
    try {
        const response = yield call(api.postCustomerCollection, action.customer);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(CustomerActions.createCustomerSuccess(data.customer));
    } catch (e) {
        yield put(CustomerActions.createCustomerFailure(e));
    }
}

export function * getCustomer(api, action) {
    try {
        const response = yield call(api.getCustomerResource, action.customer_id);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }
        const data = response.data.data;

        yield put(CustomerActions.fetchCustomerSuccess(data.customer));
    } catch (e) {
        yield put(CustomerActions.fetchCustomerFailure(e));
    }
}

export function * updateCustomer(api, action) {
    try {
        const response = yield call(api.patchCustomerResource, action.customer_id, action.customer);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(CustomerActions.updateCustomerSuccess(data.customer));
    } catch (e) {
        yield put(CustomerActions.updateCustomerFailure(e));
    }
}

export function * deleteCustomer(api, action) {
    try {
        const response = yield call(api.deleteCustomerResource, action.customer_id );
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        yield put(CustomerActions.deleteCustomerSuccess());
    } catch (e) {
        yield put(CustomerActions.deleteCustomerFailure(e));
    }
}

export function * watchCustomer(api) {
    yield takeLatest(CustomerTypes.FETCH_CUSTOMERS, getCustomers, api);
    yield takeLatest(CustomerTypes.CREATE_CUSTOMER, createCustomer, api);
    yield takeLatest(CustomerTypes.FETCH_CUSTOMER, getCustomer, api);
    yield takeLatest(CustomerTypes.UPDATE_CUSTOMER, updateCustomer, api);
    yield takeLatest(CustomerTypes.DELETE_CUSTOMER, deleteCustomer, api);
}
