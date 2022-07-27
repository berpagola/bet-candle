/*'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cliente_type', [{
      id : 1,
      name : 'Tipo 1',
      created_at: '2019-05-16 13:18:08.009+00',
      updated_at: '2019-05-16 13:18:08.009+00'
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('cliente_type', [{
      name :'Tipo 1'
    }])
  }
};
*/

'use strict';

const models = require('../models/index')

module.exports = {
  up : function (queryInterface, Sequelize) {
    return Promise.all ([
      models.cliente_type.findOrCreate({
        where: {
          id: "1"},
        defaults:{
          name : 'Tipo 1',
          created_at: '2019-05-16 13:18:08.009+00',
          updated_at: '2019-05-16 13:18:08.009+00'
        }
      })
    ])
  },
  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('cliente_type', [{
      name :'Tipo 1'
    }])
  }
};