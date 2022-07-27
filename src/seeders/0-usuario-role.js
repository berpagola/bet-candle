'use strict';

const models = require('../models/index')

module.exports = {
  up : function (queryInterface, Sequelize) {
    return Promise.all ([
      models.usuario_role.findOrCreate({
        where: {
          id: "1"},
        defaults: {
          name: "CEO",
          description: "asd",
          created_at: "2019-05-16 13:18:08.009+00",
          updated_at: "2019-05-16 13:18:08.009+00"
        }
      })
    ])
  },
};