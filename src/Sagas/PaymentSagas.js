import { takeLatest, put, call, select } from 'redux-saga/effects';
import PaymentActions, { PaymentTypes } from '../Redux/PaymentRedux';
import ApiResponseError from '../Services/ApiResponseError';

export function * getPayments(api, action) {
    try {
        const response = yield call(api.getPaymentCollection, action.query);
        if (!response.ok) {
            throw new ApiResponseError(response);
        }

        const data = response.data.data;

        yield put(PaymentActions.fetchPaymentsSuccess(data.payments, data.pagination));
    } catch (e) {
        yield put(PaymentActions.fetchPaymentsFailure(e));
    }
}

export function * watchPayment(api) {
    yield takeLatest(PaymentTypes.FETCH_PAYMENTS, getPayments, api);
}
