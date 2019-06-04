import ReduxPersist from '../Config/ReduxPersist';
import { persistStore } from 'redux-persist';
import StartupActions from '../Redux/StartupRedux';
import DebugConfig from '../Config/DebugConfig';

const updateReducers = (store: Object) => {
    const reducerVersion = ReduxPersist.reducerVersion
    const config = ReduxPersist.storeConfig
    const startup = () => store.dispatch(StartupActions.init())

    var localVersion = localStorage.getItem('reducerVersion');
    // Check to ensure latest reducer version
    if (!localVersion)
    {
        persistStore(store, config, startup);
        localStorage.setItem('reducerVersion', reducerVersion);
    }
    else{
        if (localVersion !== reducerVersion) {
            persistStore(store, config, startup).purge();
            localStorage.setItem('reducerVersion', reducerVersion);
            localStorage.removeItem('authorization');
        } else {
            persistStore(store, config, startup)
        }
    }
}

export default {updateReducers}
