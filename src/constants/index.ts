export const daysList = {
  '1': 'Lunes',
  '2': 'Martes',
  '3': 'Miércoles',
  '4': 'Jueves',
  '5': 'Viernes',
};

export const fixedPackagesInfo = [
  {
    size: '20x20x10',
    id: 'S',
    imgWidth: 25,
    imgHeight: 27,
    altImgWidth: 35,
  },
  {
    size: '50x40x10',
    id: 'M',
    imgWidth: 35,
    imgHeight: 37,
    altImgWidth: 45,
  },
  {
    size: '40x30x15',
    id: 'L',
    imgWidth: 47,
    imgHeight: 51,
    altImgWidth: 57,
  },
];

export const panelPagesList = [
  {
    title: 'Órdenes',
    routeInfo: `orders`,
    iconRoute: `/assets/images/icons/panelMenu/orders-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/orders-color.png`,
    iconWidth: 28,
    iconHeight: 29,
  },
  {
    title: 'Remitente',
    routeInfo: `remitter`,
    iconRoute: `/assets/images/icons/panelMenu/remitter.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/remitter.png`,
    iconWidth: 23,
    iconHeight: 36,
  },
  {
    title: 'Tus despachos',
    routeInfo: `dispatch`,
    iconRoute: `/assets/images/icons/panelMenu/dispatch.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/dispatch.png`,
    iconWidth: 36,
    iconHeight: 36,
  },
  {
    title: 'Tu cuenta',
    routeInfo: `account`,
    iconRoute: `/assets/images/icons/panelMenu/account.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/account.png`,
    iconWidth: 30,
    iconHeight: 30,
  },
  {
    title: 'Remito',
    routeInfo: `receipt`,
    iconRoute: `/assets/images/icons/panelMenu/receipt.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/receipt.png`,
    iconWidth: 28,
    iconHeight: 28,
  },
  {
    title: 'Impresoras',
    routeInfo: `print`,
    iconRoute: `/assets/images/icons/panelMenu/print.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/print.png`,
    iconWidth: 26,
    iconHeight: 26,
  },
];

export const panelVtexPagesList = [
  {
    title: 'Órdenes',
    routeInfo: `orders`,
    iconRoute: `/assets/images/icons/panelMenu/orders-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/orders-color.png`,
    iconWidth: 28,
    iconHeight: 29,
  },
  {
    title: 'Muelle',
    routeInfo: `locations`,
    iconRoute: `/assets/images/icons/panelMenu/remitter-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/remitter-color.png`,
    iconWidth: 23,
    iconHeight: 36,
  },
  {
    title: 'Remito',
    routeInfo: `receipt`,
    iconRoute: `/assets/images/icons/panelMenu/receipt-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/receipt-color.png`,
    iconWidth: 28,
    iconHeight: 28,
  },
];

export const panelWooPrestaPagesList = [
  {
    title: 'Órdenes',
    routeInfo: `orders`,
    iconRoute: `/assets/images/icons/panelMenu/orders-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/orders-color.png`,
    iconWidth: 28,
    iconHeight: 29,
  },
  {
    title: 'Remitente',
    routeInfo: `remitter`,
    iconRoute: `/assets/images/icons/panelMenu/remitter-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/remitter-color.png`,
    iconWidth: 23,
    iconHeight: 36,
  },
  {
    title: 'Tus despachos',
    routeInfo: `dispatch`,
    iconRoute: `/assets/images/icons/panelMenu/dispatch-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/dispatch-color.png`,
    iconWidth: 36,
    iconHeight: 22,
  },
  {
    title: 'Tu cuenta',
    routeInfo: `account`,
    iconRoute: `/assets/images/icons/panelMenu/account-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/account-color.png`,
    iconWidth: 24,
    iconHeight: 25,
  },
  {
    title: 'Tu paquete',
    routeInfo: `package`,
    iconRoute: `/assets/images/icons/panelMenu/package-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/package-color.png`,
    iconWidth: 25,
    iconHeight: 26,
  },
  {
    title: 'Remito',
    routeInfo: `receipt`,
    iconRoute: `/assets/images/icons/panelMenu/receipt-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/receipt-color.png`,
    iconWidth: 28,
    iconHeight: 28,
  },
  {
    title: 'Servicios',
    routeInfo: `services`,
    iconRoute: `/assets/images/icons/panelMenu/services-white.png`,
    iconRouteActive: `/assets/images/icons/panelMenu/services-color.png`,
    iconWidth: 28,
    iconHeight: 28,
  },
];

export const panelStatusOptions = [
  {
    name: 'Por crear',
    value: 'PENDING',
    description: 'Genera tu etiqueta para comenzar con el envío.',
  },
  {
    name: 'Creado',
    value: 'CREATED',
    description: 'El envío y la etiqueta fueron creados correctamente.',
  },
  {
    name: 'Retirado',
    value: 'COLLECTED',
    description: 'Tu envío está en manos de OCA.',
  },
  {
    name: 'En camino',
    value: 'ON_ROUTE',
    description: 'Tu envío inició el recorrido a su destino.',
  },
  {
    name: 'En sucursal',
    value: 'AT_STORE',
    description: 'Tu envío se encuentra en la sucursal de destino.',
  },
  {
    name: 'Entregado',
    value: 'DELIVERED',
    description: 'Tu envío fue recibido correctamente.',
  },
  {
    name: 'Cancelado',
    value: 'ERROR',
    description: 'Hay errores en la entrega del envío, revisa los datos.',
  },
  {
    name: 'En devolución',
    value: 'RETURNED',
    description: 'El envío está en proceso de devolución al punto de origen.',
  },
];

export const panelDispatchTypeOptions = [
  {
    name: 'Sucursal',
    value: 'store',
  },
  {
    name: 'Domicilio',
    value: 'home',
  },
  {
    name: 'Locker',
    value: 'locker',
  },
];

export const gridSizePerPageOptions = [
  {
    name: '5',
    value: 5,
  },
  {
    name: '10',
    value: 10,
  },
  {
    name: '20',
    value: 20,
  },
  {
    name: '40',
    value: 40,
  },
  {
    name: '50',
    value: 50,
  },
  {
    name: '100',
    value: 100,
  },
];
