'use strict';

const models = require('../models/index')

module.exports = {
  up : function (queryInterface, Sequelize) {
    return Promise.all ([
      models.usuario.findOrCreate({
        where: {
          id: "1"},
        defaults:{
          username: "USER2 TEST",
          nombre: "nombre",
          email: "test@test.com",
          password: "$2a$10$Y58jTJBsP0gGef5xbZN4NezQuf4i5CrvKcN0LFERSeV/5VXQCosFa",
          state: 1,
          clienteGeneralId: "1",
          usuarioRoleId: "1",
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      }),
      models.usuario.findOrCreate({
        where: {
          id: "2"},
        defaults:{
          username: "USUARIO DE PRUEBA",
          nombre: "Test",
          email: "usuarioprueba@test.com",
          password: "$2a$10$JvY5mf6rcACbOsqNTv4Youb3Rx47UVCYyEwKD2uN0YbVN0M1Eu8PK",
          state: 1,
          clienteGeneralId: "1",
          usuarioRoleId: "1",
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      })
    ])
  },
};