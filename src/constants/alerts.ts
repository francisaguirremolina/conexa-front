const alerts = {

  // Default
  'panel.create-shipment-uknown-error': 'Ocurrió un error inesperado. Por favor, escribinos a atencionclientes@oca.com.ar.',

  'error.user-not-found': 'El usuario ingresado no existe.',

  // Onboarding

    //success
  'onboarding.authenticated': 'Las credenciales fueron validadas correctamente.',

  'onboarding.initial-state': 'Obtuvimos correctamente tus configuraciones.',

  'onboarding.nearby-stores': 'Las sucursales más cercanas a tu código postal ya están disponibles para seleccionar.',

  'onboarding.updated-merchant': '¡Tu método de envío ha sido actualizado correctamente',

  'onboarding.create-shipping-service': 'El servicio fue creado correctamente.',
  
  'onboarding.get-docks' : 'La lista de muelles se ha obtenido correctamente.',

  'onboarding.update-docks' : 'La lista de muelles se ha guardado correctamente.',

  'onboarding.config-dock' : 'La configuración del muelle se ha guardado correctamente.',

  'onboarding.create-dock' : 'El muelle se ha creado correctamente.',
  
  'onboarding.get-account' : 'La cuenta se ha obtenido correctamente.',

  'onboarding.config-account' : 'La configuración de la cuenta se ha guardado correctamente.',


    //failure
  'onboarding.user-oca-not-found': 'El usuario OCA no existe.',

  'onboarding.user-not-found': 'El usuario no existe.',

  'onboarding.invalid-credentials': 'Las credenciales son inválidas.',

  'onboarding.branches-not-found': 'No existen sucursales cercanas con ese código postal.',

  'onboarding.dock-get-failure' : 'No se pudo obtener la lista de muelles.',

  'onboarding.dock-update-failure' : 'No se pudo guardar la lista de muelles.',

  'onboarding.dock-config-failure' : 'No se pudo guardar la configuración del muelle.',

  'onboarding.dock-create-failure' : 'No se pudo crear el muelle.',

  'onboarding.account-get-failure' : 'No se pudo obtener la cuenta.',

  'onboarding.account-config-failure' : 'No se pudo guardar la configuración de la cuenta.',

  'onboarding.operationals-not-found' : 'Existe un problema con tus operativas. Si necesitás asistencia, no dudes en escribirnos a atencionclientes@oca.com.ar.',

  '401: Unauthorized - Invalid access token' : 'No se pudo crear el envío. Verifique que su aplicación esté instalada correctamente.',

  'onboarding.oca-data-not-found' : 'Existe un problema con tu CUIT configurado. Por favor escribinos a atencionclientes@oca.com.ar',

  'onboarding.invalid-cuit-oca' : 'Existe un problema con tu CUIT configurado. Por favor escribinos a atencionclientes@oca.com.ar',

  
  //Panel

    //success
  'panel.create-shipment': 'El envío fue creado exitosamente.',

  'panel.create-shipments': 'Las órdenes fueron creadas exitosamente.',

  'panel.cancel-order': 'La cancelación fue exitosa.',

  'panel.get-receipt-settings': 'Obtuvimos correctamente tu configuración.',

  'panel.edit-receipt-settings': 'Las configuraciones del remito fueron guardadas correctamente',

  'panel.get-account': 'Obtuvimos correctamente los datos de tu cuenta.',

  'panel.edit-account': 'Tu método de envío ha sido actualizado correctamente.',

    //failure
  'panel.order-not-found': 'Recuerda que para poder crear tu envio en OCA, tu cliente debe haber seleccionado ese metodo de envio.',
  
  'panel.user-not-exist': 'No se encontró el usuario del paso previo del onboarding',

  'panel.edit-order-failed': 'No pudimos modificar esta orden. Inténtalo nuevamente.',
  
  'panel.label-not-found': 'La etiqueta solicitada no existe en OCA.',

  'panel.create-shipments-failed': 'No se pudo crear el envío. Verifique que su aplicación esté instalada correctamente.',

  'panel.error-cancel-order': 'No pudimos cancelar el envío.',

  'panel.create-shipping-error' : 'Error de operativa o CUIT',

  'onboarding.pending-orders' : 'Para modificar la configuración de tus despachos, no debes tener órdenes pendientes de creación. Por favor, crea o cancela las órdenes pendientes y luego podrás proceder a modificar la configuración de tus despachos.',

  'panel.error-create-order' : "El Centro de Imposición/Agente Oficial de destino no se encuentra habilitado",

  'panel.operational-out-of-date' : 'Detectamos un problema con tus operativas. Por favor, verificá que hayas seleccionado las operativas correctas desde la sección TU CUENTA. Si necesitás asistencia, no dudes en escribirnos a atencionclientes@oca.com.ar',

  'panel.origin-not-enabled' : 'La sucursal que seleccionaste para el despacho de tu producto ya no está disponible. Por favor, elegí otra sucursal desde la sección TUS DESPACHOS y creá el envío nuevamente',
  
  'panel.destination-not-enabled' : 'La sucursal que seleccionó el cliente para recibir el producto ya no está disponible. Por favor escribinos a atencionclientes@oca.com.ar',

  'panel.order-not-found-in-db' : 'La sucursal que seleccionaste para el despacho de tu producto ya no está disponible. Por favor, elegí otra sucursal desde la sección TUS DESPACHOS y creá el envío nuevamente',

  'panel.order-not-from-oca': 'No se crearon las etiquetas. Revisá que el medio de envío asociado sea OCA.',

  'panel.operational-not-exist': 'La orden solicitada no existe.',

  'panel.invalid-operational' : 'Detectamos un problema con tus operativas. Por favor, verificá que hayas seleccionado las operativas correctas desde la sección TU CUENTA. Si necesitás asistencia, no dudes en escribirnos a atencionclientes@oca.com.ar.',

  // 'panel.order-not-found-in-tn' : 'La sucursal que seleccionaste no existe en TN' ,

  // VTEX

  'panel.disabled-dock' : 'El muelle asociado se encuentra deshabilitado.',

  'panel.dock-not-found' : 'El muelle asociado no se encuentra disponible.',

  'panel.label-creation-error' : 'Error al generar etiqueta.',

  'panel.user-dispatch-not-found' : 'Sucursal de despacho no configurada.',

  'panel.invalid-xml-structure' : 'Ocurrió un error inesperado. Por favor, escribinos a atencionclientes@oca.com.ar'

};

export default alerts;
