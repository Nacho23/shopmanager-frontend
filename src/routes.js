import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  // Renderiza algun componente que muestre que carga aun
  return <div style={{color: 'white'}}>Cargando...</div>;
}

const DashboardContainer = Loadable({
  loader: () => import('./Containers/Dashboard/DashboardContainer.js'),
  loading: Loading,
});

const ProviderContainer = Loadable({
  loader: () => import('./Containers/Provider/ProviderContainer.js'),
  loading: Loading,
});

const CustomerContainer = Loadable({
  loader: () => import('./Containers/Customer/CustomerContainer.js'),
  loading: Loading,
});

const ServiceContainer = Loadable({
  loader: () => import('./Containers/Service/ServiceContainer.js'),
  loading: Loading,
});

const SaleContainer = Loadable({
  loader: () => import('./Containers/Sale/SaleContainer.js'),
  loading: Loading,
});

const SaleRegistryContainer = Loadable({
  loader: () => import('./Containers/Sale/SaleRegistryContainer.js'),
  loading: Loading,
});

const PaymentRegistryContainer = Loadable({
  loader: () => import('./Containers/Sale/PaymentRegistryContainer.js'),
  loading: Loading,
});

const ReportContainer = Loadable({
  loader: () => import('./Containers/Report/ReportContainer.js'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: '', component: DashboardContainer },
  { path: '/provider', name: 'Proveedores', component: ProviderContainer },
  { path: '/customer', name: 'Clientes', component: CustomerContainer },
  { path: '/service', name: 'Productos', component: ServiceContainer },
  { path: '/sale/make_sale', name: 'Ventas', component: SaleContainer },
  { path: '/sale/sale_registry', name: 'Registro de ventas', component: SaleRegistryContainer },
  { path: '/sale/sale_payment', name: 'Registro de pagos', component: PaymentRegistryContainer },
  { path: '/report', name: 'Informes', component: ReportContainer },
];

export default routes;
