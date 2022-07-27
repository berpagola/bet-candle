'use strict';
const models = require('../models/index')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      models.permiso.findOrCreate({
        where: {
          id: "1"
        },
        defaults: {
          nombre_publico: 'Nombre publico 1',   // OBLIGATORIO
          nombre_interno: 'Nombre_interno_1',   // OBLIGATORIO
          descripcion: 'Descripcion 1',  // PUEDE ESTAR VACIO
          //permisoHijoId: 1, // ES EL ID DEL PERMISO PADRE (OPCIONAL)
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      }),
      models.permiso.findOrCreate({
        where: {
          id: "2"
        },
        defaults: {
          nombre_publico: 'Nombre publico 2',   // OBLIGATORIO
          nombre_interno: 'nombre_interno_2',   // OBLIGATORIO
          descripcion: 'Descripcion 2',  // PUEDE ESTAR VACIO
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      }),
      models.permiso.findOrCreate({
        where: {
          id: "3"
        },
        defaults: {
          nombre_publico: 'Nombre publico 3',   // OBLIGATORIO
          nombre_interno: 'nombre_interno_3',   // OBLIGATORIO
          descripcion: 'Descripcion 3',  // PUEDE ESTAR VACIO
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      })
    ])
  }
}
