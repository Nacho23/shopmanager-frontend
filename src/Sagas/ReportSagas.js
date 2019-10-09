import { takeLatest, put, call, select } from 'redux-saga/effects';
import ReportActions, { ReportTypes } from '../Redux/ReportRedux';
import ApiResponseError from '../Services/ApiResponseError';

export function * generate(api, action) {
    try {
        const response = yield call(api.generateReport, action.report, action.data);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        yield put(ReportActions.generateSuccess());
    } catch (e) {
        yield put(ReportActions.generateFailure(e));
    }
}

export function * watchReport(api) {
    yield takeLatest(ReportTypes.GENERATE, generate, api);
}
