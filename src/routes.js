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

const ProductContainer = Loadable({
  loader: () => import('./Containers/Product/ProductContainer.js'),
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

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Inicio', component: DashboardContainer },
  { path: '/provider', name: 'Proveedores', component: ProviderContainer },
  { path: '/customer', name: 'Clientes', component: CustomerContainer },
  { path: '/product', name: 'Productos', component: ProductContainer },
  { path: '/sale/make_sale', name: 'Ventas', component: SaleContainer },
  { path: '/sale/sale_registry', name: 'Ventas', component: SaleRegistryContainer },
];

export default routes;
