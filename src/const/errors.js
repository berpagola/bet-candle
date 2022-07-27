/**
 * Application errors
 */
module.exports = {

  /**
   * @api / 0 - Example
   * @apiName ErrorResponseExample
   * @apiGroup Errors
   *
   * @apiErrorExample Error-Response-Format:
   *     HTTP/1.1 200 OK
   *     {
   *       'success': 'false',
   *       'error': {
   *          'code': 404
   *          'message': 'Not Found'
   *       }
   *     }
   */

  /**
   * @api / 1401 - UsuarioUnauthorized
   * @apiName UsuarioUnauthorized
   * @apiGroup Errors
   *
   * @apiDescription message: No se encuentra autorizado para realizar la acción
   */
  /**
   * @apiDefine UsuarioUnauthorized
   * @apiError UsuarioUnauthorized Code 1401
   */
  'UsuarioUnauthorized': {
    code: 1401,
    message: 'No se encuentra autorizado para realizar la acción'
  },
  /**
   * @api / 404 - NotImplemented
   * @apiName NotImplemented
   * @apiGroup Errors
   *
   * @apiDescription message: El endpoint se encuentra en desarrollo
   */
  /**
   * @apiDefine NotImplemented
   * @apiError NotImplemented Code 404
   */
  'NotImplemented': {
    code: 404,
    message: 'El endpoint se encuentra en desarrollo'
  },
  /**
   * @api / 1000 - UsuarioAlreadyExists
   * @apiName UsuarioAlreadyExists
   * @apiGroup Errors
   *
   * @apiDescription message: El usuario ya existe
   */
  /**
   * @apiDefine UsuarioAlreadyExists
   * @apiError UsuarioAlreadyExists Code 1000
   */
  'UsuarioAlreadyExists': {
    code: 1000,
    message: 'El usuario ya existe'
  },
  /**
   * @api / 1001 - MissingParameters
   * @apiName MissingParameters
   * @apiGroup Errors
   *
   * @apiDescription message: Faltan parámetros necesarios
   */
  /**
   * @apiDefine MissingParameters
   * @apiError MissingParameters Code 1001
   */
  'MissingParameters': {
    code: 1001,
    message: 'Faltan parámetros necesarios'
  },
  /**
   * @api / 1002 - ValidationError
   * @apiName ValidationError
   * @apiGroup Errors
   *
   * @apiDescription message: Error de validación
   */
  /**
   * @apiDefine ValidationError
   * @apiError ValidationError Code 1002
   */
  'ValidationError': {
    code: 1002,
    message: 'Error de validación'
  },
  /**
   * @api / 1003 - InvalidCredentials
   * @apiName InvalidCredentials
   * @apiGroup Errors
   *
   * @apiDescription message: Credenciales inválidas
   */
  /**
   * @apiDefine InvalidCredentials
   * @apiError InvalidCredentials Code 1003
   */
  'InvalidCredentials': {
    code: 1003,
    message: 'Credenciales inválidas'
  },
  'UsuarioInactivo': {
    code: 1003,
    message: 'Usuario inactivo'
  },
  'UsuarioBloqueado': {
    code: 1003,
    message: 'Usuario bloqueado'
  },
  /**
   * @api / 1004 - BrandNotFound
   * @apiName BrandNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: La marca no existe
   */
  /**
   * @apiDefine BrandNotFound
   * @apiError BrandNotFound Code 1004
   */
  'BrandNotFound': {
    code: 1004,
    message: 'La marca no existe'
  },
  /**
   * @api / 1005 - TypeNotFound
   * @apiName TypeNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El tipo no existe
   */
  /**
   * @apiDefine TypeNotFound
   * @apiError TypeNotFound Code 1005
   */
  'TypeNotFound': {
    code: 1005,
    message: 'El tipo no existe'
  },
  /**
   * @api / 1006 - ModelNotFound
   * @apiName ModelNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El modelo no existe
   */
  /**
   * @apiDefine ModelNotFound
   * @apiError ModelNotFound Code 1006
   */
  'ModelNotFound': {
    code: 1006,
    message: 'El modelo no existe'
  },
  /**
   * @api / 1007 - GenericNotFound
   * @apiName GenericNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El elemento generico no existe
   */
  /**
   * @apiDefine GenericNotFound
   * @apiError GenericNotFound Code 1007
   */
  'GenericNotFound': {
    code: 1007,
    message: 'El elemento generico no existe'
  },
  /**
   * @api / 1008 - LocationNotFound
   * @apiName LocationNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: La ubicacion no existe
   */
  /**
   * @apiDefine LocationNotFound
   * @apiError LocationNotFound Code 1008
   */
  'LocationNotFound': {
    code: 1008,
    message: 'La ubicacion no existe'
  },

  /**
   * @api / 1009 - OriginNotFound
   * @apiName OriginNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El origen no existe
   */
  /**
   * @apiDefine OriginNotFound
   * @apiError OriginNotFound Code 1009
   */
  'OriginNotFound': {
    code: 1009,
    message: 'El origen no existe'
  },
  /**
   * @api / 1010 - ClientTypeNotFound
   * @apiName ClientTypeNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El tipo de clienteGeneral no existe
   */
  /**
   * @apiDefine ClientTypeNotFound
   * @apiError ClientTypeNotFound Code 1010
   */
  'ClientTypeNotFound': {
    code: 1010,
    message: 'El tipo de clienteGeneral no existe'
  },
  /**
   * @api / 1011 - AreaNotFound
   * @apiName AreaNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El area no existe
   */
  /**
   * @apiDefine AreaNotFound
   * @apiError AreaNotFound Code 1011
   */
  'AreaNotFound': {
    code: 1011,
    message: 'El area no existe'
  },
  /**
   * @api / 1012 - EquipmentNotFound
   * @apiName EquipmentNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El equipo no existe
   */
  /**
   * @apiDefine EquipmentNotFound
   * @apiError EquipmentNotFound Code 1012
   */
  'EquipmentNotFound': {
    code: 1012,
    message: 'El equipo no existe'
  },
  /**
   * @api / 1013 - RoleNotFound
   * @apiName RoleNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El rol no existe
   */
  /**
   * @apiDefine RoleNotFound
   * @apiError RoleNotFound Code 1013
   */
  'RoleNotFound': {
    code: 1013,
    message: 'El rol no existe'
  },
  /**
   * @api / 1014 - ProviderNotFound
   * @apiName ProviderNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El proveedor no existe
   */
  /**
   * @apiDefine ProviderNotFound
   * @apiError ProviderNotFound Code 1014
   */
  'ProviderNotFound': {
    code: 1014,
    message: 'El proveedor no existe'
  },
  /**
   * @api / 1015 - OrderNotFound
   * @apiName OrderNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: La orden no existe
   */
  /**
   * @apiDefine OrderNotFound
   * @apiError OrderNotFound Code 1015
   */
  'OrderNotFound': {
    code: 1015,
    message: 'La order no existe'
  },
  /**
   * @api / 1016 - InvalidTask
   * @apiName InvalidTask
   * @apiGroup Errors
   *
   * @apiDescription message: La tarea elegida es invalida o no existe
   */
  /**
   * @apiDefine InvalidTask
   * @apiError InvalidTask Code 1016
   */
  'InvalidTask': {
    code: 1016,
    message: 'La tarea elegida es invalida o no existe'
  },
  /**
   * @api / 1017 - InstrumentNotFound
   * @apiName InstrumentNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El instrumento elegido no existe
   */
  /**
   * @apiDefine InstrumentNotFound
   * @apiError InstrumentNotFound Code 1017
   */
  'InstrumentNotFound': {
    code: 1017,
    message: 'El instrumento elegido no existe'
  },
  /**
   * @api / 1018 - PlanNotFound
   * @apiName PlanNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El plan para el equipo elegido no existe
   */
  /**
   * @apiDefine PlanNotFound
   * @apiError PlanNotFound Code 1018
   */
  'PlanNotFound': {
    code: 1018,
    message: 'El plan para el equipo elegido no existe'
  },
  /**
   * @api / 1019 - RiskNotFound
   * @apiName RiskNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El riesgo no existe
   */
  /**
   * @apiDefine RiskNotFound
   * @apiError RiskNotFound Code 1019
   */
  'RiskNotFound': {
    code: 1019,
    message: 'El riesgo no existe'
  },
  /**
   * @api / 1020 - MaintenanceTypeNotFound
   * @apiName MaintenanceTypeNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El tipo de mantenimiento no existe
   */
  /**
   * @apiDefine MaintenanceTypeNotFound
   * @apiError MaintenanceTypeNotFound Code 1020
   */
  'MaintenanceTypeNotFound': {
    code: 1020,
    message: 'El tipo de mantenimiento no existe'
  },
  /**
   * @api / 1021 - ExecutionNotFound
   * @apiName ExecutionNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: No se encontro ninguna ejecucion
   */
  /**
   * @apiDefine ExecutionNotFound
   * @apiError ExecutionNotFound Code 1021
   */
  'ExecutionNotFound': {
    code: 1021,
    message: 'No se encontro ninguna ejecucion'
  },
  /**
   * @api / 1022 - PlanNotActive
   * @apiName PlanNotActive
   * @apiGroup Errors
   *
   * @apiDescription message: El plan no esta activo
   */
  /**
   * @apiDefine PlanNotActive
   * @apiError PlanNotActive Code 1022
   */
  'PlanNotActive': {
    code: 1022,
    message: 'El plan no esta activo'
  },
  /**
   * @api / 1023 - ExecutionPendingApproval
   * @apiName ExecutionPendingApproval
   * @apiGroup Errors
   *
   * @apiDescription message: La ejecucion no puede ser editada
   */
  /**
   * @apiDefine ExecutionPendingApproval
   * @apiError ExecutionPendingApproval Code 1023
   */
  'ExecutionPendingApproval': {
    code: 1023,
    message: 'La ejecucion no puede ser editada'
  },
  /**
   * @api / 1024 - AuthorizationNotFound
   * @apiName AuthorizationNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: La autorizacion no existe
   */
  /**
   * @apiDefine AuthorizationNotFound
   * @apiError AuthorizationNotFound Code 1024
   */
  'AuthorizationNotFound': {
    code: 1024,
    message: 'La autorizacion no existe'
  },
  /**
   * @api / 1025 - InvalidQuantitativeValue
   * @apiName InvalidQuantitativeValue
   * @apiGroup Errors
   *
   * @apiDescription message: Algun valor de una tarea cuantitativa es invalido
   */
  /**
   * @apiDefine InvalidQuantitativeValue
   * @apiError InvalidQuantitativeValue Code 1025
   */
  'InvalidQuantitativeValue': {
    code: 1025,
    message: 'Algun valor de una tarea cuantitativa es invalido'
  },
  /**
   * @api / 1026 - UncalibratedInstrument
   * @apiName UncalibratedInstrument
   * @apiGroup Errors
   *
   * @apiDescription message: Algun instrumento no esta debidamente calibrado
   */
  /**
   * @apiDefine UncalibratedInstrument
   * @apiError UncalibratedInstrument Code 1026
   */
  'UncalibratedInstrument': {
    code: 1026,
    message: 'Algun instrumento no esta debidamente calibrado'
  },
  /**
   * @api / 1027 - SessionExpired
   * @apiName SessionExpired
   * @apiGroup Errors
   *
   * @apiDescription message: La sesion ha expirado
   */
  /**
   * @apiDefine SessionExpired
   * @apiError SessionExpired Code 1027
   */
  'SessionExpired': {
    code: 1027,
    message: 'La sesion ha expirado'
  },
  /**
   * @api / 1028 - MailFailure
   * @apiName MailFailure
   * @apiGroup Errors
   *
   * @apiDescription message: El mail no pudo ser enviado
   */
  /**
   * @apiDefine MailFailure
   * @apiError MailFailure Code 1028
   */
  'MailFailure': {
    code: 1028,
    message: 'El mail no pudo ser enviado'
  },
  /**
   * @api / 1029 - UsuarioNotFound
   * @apiName UsuarioNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El usuario no existe
   */
  /**
   * @apiDefine UsuarioNotFound
   * @apiError UsuarioNotFound Code 1029
   */
  'UsuarioNotFound': {
    code: 1029,
    message: 'El usuario no existe'
  },
  /**
   * @api / 500 - UsuarioLimit
   * @apiName UsuarioNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: El usuario no existe
   */
  /**
   * @apiDefine UsuarioNotFound
   * @apiError UsuarioNotFound Code 1029
   */
  'UsuariosLimit': {
    code: 500,
    message: 'Su plan no le permite crear mas usuarios'
  },
  /**
   * @api / 1030 - TokenExpired
   * @apiName TokenExpired
   * @apiGroup Errors
   *
   * @apiDescription message: El token ha expirado
   */
  /**
   * @apiDefine TokenExpired
   * @apiError TokenExpired Code 1030
   */
  'TokenExpired': {
    code: 1030,
    message: 'El token ha expirado'
  },
  'PaisInexistente': {
    code: 1031,
    message: 'El pais asociado no existe'
  },
  'ProvinciaInexistente': {
    code: 1032,
    message: 'La provincia asociada no existe'
  },
  'ProvinciaExistente': {
    code: 1032,
    message: 'La provincia ya existe'
  },
  'UsuarioInexistente': {
    code: 1033,
    message: 'El usuario asociado no existe'
  },
  'SanatorioInexistente': {
    code: 1034,
    message: 'El sanatorio asociado no existe'
  },
  'EspecialidadInexistente': {
    code: 1035,
    message: 'La especialidad asociada no existe'
  },
  'GuardiaPuestoFijoInexistente': {
    code: 1036,
    message: 'La guardia asociada no existe'
  },
  'GuardiaReemplazoInexistente': {
    code: 1037,
    message: 'La guardia asociada no existe'
  },
  'LocalidadInexistente': {
    code: 1038,
    message: 'La localidad asociada no existe'
  },
  'LocalidadExistente': {
    code: 1038,
    message: 'La localidad ya existe'
  },
  /*'MedicoInexistente': {
    code: 1039,
    message: 'El medico asociado no existe'
  },*/
  'NoEsMedico': {
    code: 1040,
    message: 'El usuario logueado no es medico'
  },
  'NoEsAdmin': {
    code: 1041,
    message: 'El usuario logueado no es administrador'
  },
  'NoEsCorporativo': {
    code: 1042,
    message: 'El usuario logueado no es corporativo'
  },
  'guardiaNoDsiponible': {
    code: 1043,
    message: 'La guardia seleccionada no esta disponible'
  },
  'MailRegistrado': {
    code: 1044,
    message: 'El mail pertenece a una cuenta existente'
  },
  'FabricanteInexistente': {
    code: 1045,
    message: 'El fabricante no existe'
  },
  'AnimalInexistente': {
    code: 1046,
    message: 'El animal no existe'
  },
  'CaravanaInexistente': {
    code: 1046,
    message: 'La caravana no existe'
  },
  'TipoAnimalInexistente': {
    code: 1047,
    message: 'El tipo de animal no existe'
  },
  'LoteInexistente': {
    code: 1048,
    message: 'El lote no existe'
  },
  'AnimalConElLoteAsignado': {
    code: 1049,
    message: 'El animal ya tiene asignado este lote'
  },
  'AnimalYaAsignado': {
    code: 1050,
    message: 'El animal ya tiene asignado un lote'
  },
  'ElTagDeCaravanaExiste': {
    code: 1051,
    message: 'Tag de caravana existente'
  },
  'ClienteSinAnimales': {
    code: 1052,
    message: 'El clienteGeneral no tiene asociado ningun animal'
  },
  'UsuarioSinPesajes': {
    code: 1053,
    message: 'El usuario no tiene asociado ningun pesaje'
  },
  'RelacionInexistente': {
    code: 1054,
    message: 'No existe relacion entre ambas partes'
  },
  'CaravanaOcupada': {
    code: 1055,
    message: 'La caravana no esta libre'
  },
  'GrupoPesajeInexistente': {
    code: 1056,
    message: 'El grupo de pesajes no existe'
  },


  // ------------------------- MARK ---------------------------- //

  'ClienteInexistente': {
    code: 1057,
    message: 'El cliente no existe'
  },
  'MedicoInexistente': {
    code: 1057,
    message: 'El medico no existe'
  },
  'ProveedorInexistente': {
    code: 1057,
    message: 'El proveedor no existe'
  },
  'ModuloInexistente': {
    code: 1057,
    message: 'El modulo no existe'
  },
  'VehiculoInexistente': {
    code: 1057,
    message: 'El vehiculo no existe'
  },
  'PartidoInexistente': {
    code: 1057,
    message: 'El partido no existe'
  },
  'PartidoExistente': {
    code: 1057,
    message: 'El partido ya existe'
  },
  'ZonaInexistente': {
    code: 1057,
    message: 'La zona no existe'
  },
  'ZonaExistente': {
    code: 1057,
    message: 'La zona ya existe'
  },
  'SiglaExistente': {
    code: 1057,
    message: 'La sigla ya existe'
  },
  'MarcaInexistente': {
    code: 1057,
    message: 'La marca no existe'
  },
  'MarcaExistente': {
    code: 1057,
    message: 'La marca ya existe'
  },
  'NombreDescartablesInexistente': {
    code: 1057,
    message: 'El nombre del descartable no existe'
  },
  'NombreDescartablesExistente': {
    code: 1057,
    message: 'El nombre del descartable ya existe'
  },
  'NombreAccesoriosInexistente': {
    code: 1057,
    message: 'El nombre del accesorio no existe'
  },
  'NombreAccesoriosExistente': {
    code: 1057,
    message: 'El nombre del accesorio ya existe'
  },
  'DescartableInexistente': {
    code: 1057,
    message: 'El descartable no existe'
  },
  'ContactoInexistente': {
    code: 1057,
    message: 'El contacto no existe'
  },
  'LocalidadesInexistentes': {
    code: 1057,
    message: 'Las localidades no existen'
  },
  'PartidosInexistentes': {
    code: 1057,
    message: 'Los partidos no existen'
  },
  'ProvinciasInexistentes': {
    code: 1057,
    message: 'Las provincias no existen'
  },
  'ZonasInexistentes': {
    code: 1057,
    message: 'Las zonas no existen'
  },
  'UbicacionProveedor': {
    code: 1057,
    message: 'El proveedor no puede tener una localidad y un pais'
  },
  'PacienteInexistente': {
    code: 1057,
    message: 'El paciente no existe'
  },
  'PacienteElementos': {
    code: 1057,
    message: 'El paciente no existe o no tiene elementos asociados'
  },
  'DiagnosticoInexistente': {
    code: 1057,
    message: 'El diagnostico no existe'
  },
  'EmpresaInexistente': {
    code: 1057,
    message: 'La empresa no existe'
  },
  'ContactoNoMedico': {
    code: 1057,
    message: 'El contacto no es del medico'
  },
  'ContactoNoProveedor': {
    code: 1057,
    message: 'El contacto no es del proveedor'
  },
  'ContactoNoCliente': {
    code: 1057,
    message: 'El contacto no es del cliente'
  },
  'ContactoNoPaciente': {
    code: 1057,
    message: 'El contacto no es del paciente'
  },
  'ModeloInexistente': {
    code: 1057,
    message: 'El modelo no existe'
  },
  'ModeloExistente': {
    code: 1057,
    message: 'El modelo ya existe'
  },
  'NombreEquiposInexistente': {
    code: 1057,
    message: 'El nombre del equipo no existe'
  },
  'NombreEquiposExistente': {
    code: 1057,
    message: 'El nombre del equipo ya existe'
  },
  'TipoEquiposExistente': {
    code: 1057,
    message: 'El tipo de equipo ya existe'
  },
  'TipoEquiposInexistente': {
    code: 1057,
    message: 'El tipo de equipo no existe'
  },
  'EquipoInexistente': {
    code: 1057,
    message: 'El equipo no existe'
  },
  'VisitaInexistente': {
    code: 1057,
    message: 'La visita no existe'
  },
  'CamposInexistente': {
    code: 1057,
    message: 'Los campos no existen'
  },
  'ServicioTecnicoInexistente': {
    code: 1057,
    message: 'El servicio tecnico no existe'
  },
  'ReparacionInexistente': {
    code: 1057,
    message: 'La reparacion no existe'
  },
  'ExpedienteNoPaciente': {
    code: 1057,
    message: 'El expediente no es del paciente'
  },
  'ExpedienteInexistente': {
    code: 1057,
    message: 'El expediente no existe'
  },
  'DomicilioInexistente': {
    code: 1057,
    message: 'El domicilio no existe'
  },
  'EnvioCargaO2Inexistente': {
    code: 1057,
    message: 'El envio_carga_o2 no existe'
  },
  'EspecialidadInexistente': {
    code: 1057,
    message: 'La especialidad no existe'
  },
  'EspecialidadExistente': {
    code: 1057,
    message: 'La especialidad existe'
  },
  'RecepcionCargaO2Inexistente': {
    code: 1057,
    message: 'La recepcion_carga_o2 no existe'
  },
  'EquipoLote': {
    code: 1057,
    message: 'El equipo ya tiene lote asignado'
  },
  'EstadoInexistente': {
    code: 1057,
    message: 'El estado no existe'
  },
  'CargaInexistente': {
    code: 1057,
    message: 'La carga no existe'
  },
  'RazonInexistente': {
    code: 1057,
    message: 'La razon no existe'
  }
  // ----------------------------------------------------------- //
}
