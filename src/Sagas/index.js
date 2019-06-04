import { fork } from 'redux-saga/effects'
import API from '../Services/Api'
import { watchAuth } from './LoginSagas';
import { watchCustomer } from './CustomerSagas';

const api = API.create(process.env.REACT_APP_API_URL);

export default function * root () {
    yield fork(watchAuth, api);
    yield fork(watchCustomer, api);
}
