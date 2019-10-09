import apisauce from 'apisauce';
import history from './history';

const REDIRECT_CODES = [7, 8];
const REDIRECT_STATUSES = [429];

const create = (baseURL) => { // home
    const api = apisauce.create({
        baseURL,
        headers: {
            Accept: 'application/json',
        }
    });
    api.addAsyncRequestTransform(request => async () => {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (accessToken) {
            request.headers['x-access-token'] = accessToken;
        }
    });

    api.addMonitor(response => {
        if (!response.ok) {
            for (let i in REDIRECT_STATUSES) {
                if (response.status === REDIRECT_STATUSES[i]) {
                    localStorage.clear();
                    history.push('/login');
                    break;
                }
                if (response.status === 403) {
                    for (let j in REDIRECT_CODES) {
                        if (response.data.code === REDIRECT_CODES[j]) {
                            localStorage.clear();
                            history.push('/login');
                            break;
                        }
                    }
                }
            }
        }
    });

    if (true) {
        api.addMonitor(response => console.log('response: ', response));
    }

    // TODO - Add error parser to transform into an specific error api
    /** Conection Login API */
    const doLogin = (email, password) => {
        return api.post('/access-token', { email, password });
    };
    const logout = (token) => {
        return api.delete(`/access-token/${token}`);
    };
    const checkAuth = (token) => {
        return api.get(`/access-token/${token}`);
    };

    /** Conection User API */
    const postUserCollection = (user) => {
        return api.post('/user', user);
    };
    const patchUserResource = (uuid, user) => {
        return api.patch(`/user/${uuid}`, user);
    };
    const deleteUserResource = (uuid) => {
        return api.delete(`/user/${uuid}`);
    };
    const getUserCollection = (query) => {
        return api.get(`/user`, query);
    };
    const getUserResource = (id) => {
        return api.get(`/user/${id}`);
    };

    /** Conection Customer API */
    const getCustomerCollection = (query) => {
        return api.get(`/customer`, query);
    }
    const postCustomerCollection = (customer) => {
        return api.post(`/customer`, customer);
    }
    const getCustomerResource = (customer_id) => {
        return api.get(`/customer/${customer_id}`);
    }
    const patchCustomerResource = (customer_id, customer) => {
        return api.patch(`/customer/${customer_id}`, customer);
    }
    const deleteCustomerResource = (customer_id) => {
        return api.delete(`/customer/${customer_id}`);
    }

    /** Conection Providers API */
    const getProviderCollection = (query) => {
        return api.get(`/provider`, query);
    }
    const postProviderCollection = (provider) => {
        return api.post(`/provider`, provider);
    }
    const getProviderResource = (provider_id) => {
        return api.get(`/provider/${provider_id}`);
    }
    const patchProviderResource = (provider_id, provider) => {
        return api.patch(`/provider/${provider_id}`, provider);
    }
    const deleteProviderResource = (provider_id) => {
        return api.delete(`/provider/${provider_id}`);
    }

    /** Conection Services API */
    const getServiceCollection = (query) => {
        return api.get(`/service`, query);
    }
    const postServiceCollection = (service) => {
        return api.post(`/service`, service);
    }
    const getServiceResource = (service_id) => {
        return api.get(`/service/${service_id}`);
    }
    const patchServiceResource = (service_id, service) => {
        return api.patch(`/service/${service_id}`, service);
    }
    const deleteServiceResource = (service_id) => {
        return api.delete(`/service/${service_id}`);
    }

    /** Conection Sales API */
    const getSaleCollection = (query) => {
        return api.get(`/sale`, query);
    }
    const postSaleCollection = (sale) => {
        return api.post(`/sale`, sale);
    }
    const getSaleResource = (sale_id) => {
        return api.get(`/sale/${sale_id}`);
    }
    const patchSaleResource = (sale_id, sale) => {
        return api.patch(`/sale/${sale_id}`, sale);
    }
    const deleteSaleResource = (sale_id) => {
        return api.delete(`/sale/${sale_id}`);
    }

    /** Contection Payments API */
    const getPaymentCollection = (query) => {
        return api.get(`/payment`, query);
    }

    /** Report calls */
    const generateReport = (report, data) => {
        return api.get(`/report/${report}`, data)
    }

    return {
        // Auth endpoint calls
        doLogin,
        logout,
        checkAuth,
        // User endpoint calls
        postUserCollection,
        patchUserResource,
        deleteUserResource,
        getUserCollection,
        getUserResource,
        // Customer calls
        getCustomerCollection,
        postCustomerCollection,
        getCustomerResource,
        patchCustomerResource,
        deleteCustomerResource,
        // Provider calls
        getProviderCollection,
        postProviderCollection,
        getProviderResource,
        patchProviderResource,
        deleteProviderResource,
        // Service calls
        getServiceCollection,
        postServiceCollection,
        getServiceResource,
        patchServiceResource,
        deleteServiceResource,
        // Sale calls
        getSaleCollection,
        postSaleCollection,
        getSaleResource,
        patchSaleResource,
        deleteSaleResource,
        // Payment calls
        getPaymentCollection,
        //Report calls
        generateReport,
    };
};

export default {
    create
}
