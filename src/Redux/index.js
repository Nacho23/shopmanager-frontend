import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { Router, Route } from 'react-router';
import { routerReducer } from 'react-router-redux';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: require('./LoginRedux').reducer,
  service: require('./ServiceRedux').reducer,
  customer: require('./CustomerRedux').reducer,
  provider: require('./ProviderRedux').reducer,
  sale: require('./SaleRedux').reducer,
  payment: require('./PaymentRedux').reducer,
  report: require('./ReportRedux').reducer,
  routing: routerReducer,
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
