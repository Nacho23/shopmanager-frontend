import { takeLatest, put, call, select } from 'redux-saga/effects';
import AuthActions, { AuthTypes } from '../Redux/LoginRedux';
import ApiResponseError from '../Services/ApiResponseError';
import history from '../Services/history';

export function * login(api, action) {
    const { email, password } = action;

    try {
        const response = yield call(api.doLogin, email, password);

        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        // Add Token on LocalStorage
        localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
        localStorage.setItem('user_uuid', response.data.user.uuid);
        //localStorage.setItem('user_rol', response.data.role)

        yield put(AuthActions.loginSuccess(response.data));
    } catch (e) {
        yield put(AuthActions.loginFailure(e));
    }
}

export function * logout(api, action) {
    try {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        const response = yield call(api.logout, accessToken);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('user_uuid');
        localStorage.clear();

        yield put(AuthActions.logoutSuccess());
    } catch (e) {
        yield put(AuthActions.logoutFailure(e));
    }
}

export function * checkAuth(api, action) {
    try {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (!accessToken){
            throw new Error('Invalid access token');
        }

        const response = yield call(api.checkAuth, accessToken);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        // Update access token
        localStorage.setItem('access_token', JSON.stringify(response.data.access_token));

        yield put(AuthActions.checkAuthSuccess(response.data.access_token));
    } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_uuid');
        localStorage.clear();
        history.push('/login');
    }
}

export function * changePassword(api, action) {
    try {
        const response = yield call(api.patchChangePasswordRequestCollection, action.data);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(AuthActions.changePasswordSuccess(data));
    } catch (e) {
        yield put(AuthActions.changePasswordFailure(e));
    }
}

export function * watchAuth(api) {
    yield takeLatest(AuthTypes.LOGIN, login, api);
    yield takeLatest(AuthTypes.CHECK_AUTH, checkAuth, api);
    yield takeLatest(AuthTypes.LOGOUT, logout, api);
    yield takeLatest(AuthTypes.CHANGE_PASSWORD, changePassword, api);
}
