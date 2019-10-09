export default {
  items: [
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Inicio',
      url: '/dashboard',
      icon: 'icon-home'
    },
    {
      name: 'Clientes',
      url: '/customer',
      icon: 'fa fa-users'
    },
    {
      name: 'Productos',
      url: '/service',
      icon: 'fa fa-tags'
    },
    {
      name: 'Proveedores',
      url: '/provider',
      icon: 'fa fa-users'
    },
    {
      name: 'Venta',
      url: '/sale',
      icon: 'fa fa-shopping-basket',
      children: [
        {
          name: 'Realizar venta',
          url: '/sale/make_sale',
          icon: 'fa fa-shopping-basket',
        },
        {
          name: 'Registro de ventas',
          url: '/sale/sale_registry',
          icon: 'fa fa-list',
        },
        {
          name: 'Registro de pagos',
          url: '/sale/sale_payment',
          icon: 'fa fa-list',
        },
      ],
    },
    {
      name: 'Informes',
      url: '/report',
      icon: 'fa fa-file-o'
    },
    {
      name: 'Ajustes',
      url: '/config',
      icon: 'fa fa-cogs'
    },
    {
      name: 'Soporte',
      url: 'https://coreui.io/react/',
      icon: 'icon-phone',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
