import { fork } from 'redux-saga/effects'
import API from '../Services/Api'
import { watchAuth } from './LoginSagas';
import { watchCustomer } from './CustomerSagas';
import { watchProvider } from './ProviderSagas';
import { watchService } from './ServiceSagas';
import { watchSale } from './SaleSagas';
import { watchPayment } from './PaymentSagas';
import { watchReport } from './ReportSagas';

const api = API.create(process.env.REACT_APP_API_URL);

export default function * root () {
    yield fork(watchAuth, api);
    yield fork(watchCustomer, api);
    yield fork(watchProvider, api);
    yield fork(watchService, api);
    yield fork(watchSale, api);
    yield fork(watchPayment, api);
    yield fork(watchReport, api);
}
