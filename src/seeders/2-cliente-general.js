'use strict';

const models = require('../models/index')

module.exports = {
  up : function (queryInterface, Sequelize) {
    return Promise.all ([
      models.cliente_general.findOrCreate({
        where: {
          id: "1"},
        defaults:{
          name: "Admin",
          cuit: "a1",
          monthlyBill: 1200,
          activeDate: "2019-05-16 13:18:08.009+00",
          read_terms: false,
          clienteTypeId: 1
        }
      })
    ])
  },
};