import { takeLatest, put, call, select } from 'redux-saga/effects';
import ServiceActions, { ServiceTypes } from '../Redux/ServiceRedux';
import ApiResponseError from '../Services/ApiResponseError';

/**
 * Get the entuty account transactions
 * @param Api    api
 * @param Action action
 */
export function * getServices(api, action) {
    try {
        const response = yield call(api.getServiceCollection, action.query);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ServiceActions.fetchServicesSuccess(data.services));
    } catch (e) {
        yield put(ServiceActions.fetchServicesFailure(e));
    }
}

export function * createService(api, action) {
    try {
        const response = yield call(api.postServiceCollection, action.service);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ServiceActions.createServiceSuccess(data.service));
    } catch (e) {
        yield put(ServiceActions.createServiceFailure(e));
    }
}

export function * getService(api, action) {
    try {
        const response = yield call(api.getServiceResource, action.service_id);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }
        const data = response.data.data;

        yield put(ServiceActions.fetchServiceSuccess(data.service));
    } catch (e) {
        yield put(ServiceActions.fetchServiceFailure(e));
    }
}

export function * updateService(api, action) {
    try {
        const response = yield call(api.patchServiceResource, action.service_id, action.service);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ServiceActions.updateServiceSuccess(data.service));
    } catch (e) {
        yield put(ServiceActions.updateServiceFailure(e));
    }
}

export function * deleteService(api, action) {
    try {
        const response = yield call(api.deleteServiceResource, action.service_id );
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        yield put(ServiceActions.deleteServiceSuccess());
    } catch (e) {
        yield put(ServiceActions.deleteServiceFailure(e));
    }
}

export function * watchService(api) {
    yield takeLatest(ServiceTypes.FETCH_SERVICES, getServices, api);
    yield takeLatest(ServiceTypes.CREATE_SERVICE, createService, api);
    yield takeLatest(ServiceTypes.FETCH_SERVICE, getService, api);
    yield takeLatest(ServiceTypes.UPDATE_SERVICE, updateService, api);
    yield takeLatest(ServiceTypes.DELETE_SERVICE, deleteService, api);
}
