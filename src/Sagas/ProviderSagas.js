import { takeLatest, put, call, select } from 'redux-saga/effects';
import ProviderActions, { ProviderTypes } from '../Redux/ProviderRedux';
import ApiResponseError from '../Services/ApiResponseError';

/**
 * Get the entuty account transactions
 * @param Api    api
 * @param Action action
 */
export function * getProviders(api, action) {
    try {
        const response = yield call(api.getProviderCollection, action.query);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ProviderActions.fetchProvidersSuccess(data.providers));
    } catch (e) {
        yield put(ProviderActions.fetchProvidersFailure(e));
    }
}

export function * createProvider(api, action) {
    try {
        const response = yield call(api.postProviderCollection, action.provider);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ProviderActions.createProviderSuccess(data.provider));
    } catch (e) {
        yield put(ProviderActions.createProviderFailure(e));
    }
}

export function * getProvider(api, action) {
    try {
        const response = yield call(api.getProviderResource, action.provider_id);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }
        const data = response.data.data;

        yield put(ProviderActions.fetchProviderSuccess(data.provider));
    } catch (e) {
        yield put(ProviderActions.fetchProviderFailure(e));
    }
}

export function * updateProvider(api, action) {
    try {
        const response = yield call(api.patchProviderResource, action.provider_id, action.provider);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(ProviderActions.updateProviderSuccess(data.provider));
    } catch (e) {
        yield put(ProviderActions.updateProviderFailure(e));
    }
}

export function * deleteProvider(api, action) {
    try {
        const response = yield call(api.deleteProviderResource, action.provider_id );
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        yield put(ProviderActions.deleteProviderSuccess());
    } catch (e) {
        yield put(ProviderActions.deleteProviderFailure(e));
    }
}

export function * watchProvider(api) {
    yield takeLatest(ProviderTypes.FETCH_PROVIDERS, getProviders, api);
    yield takeLatest(ProviderTypes.CREATE_PROVIDER, createProvider, api);
    yield takeLatest(ProviderTypes.FETCH_PROVIDER, getProvider, api);
    yield takeLatest(ProviderTypes.UPDATE_PROVIDER, updateProvider, api);
    yield takeLatest(ProviderTypes.DELETE_PROVIDER, deleteProvider, api);
}
