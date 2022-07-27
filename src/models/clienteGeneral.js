'use strict'

const globalConstants = require('../const/globalConstants')

module.exports = (sequelize, DataTypes) => {
  let ClienteGeneral = sequelize.define('cliente_general', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre no puede ser vacio'
        }
      }
    },
    cuit: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'El CUIT de cliente ya existe'
      },
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El telefono no puede ser vacio'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'la dirección no puede ser vacia'
        }
      }
    },
    monthlyBill: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'monthly_bill',
      validate: {
        min: {
          args: [0.0],
          msg: 'La cuota mensual no puede ser menor a 0.0'
        }
      }
    },
    activeDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'active_date',
      validate: {
        notEmpty: {
          args: true,
          msg: 'La fecha de inicio no puede ser vacía'
        }
      }
    },
    readTerms: {
      type: DataTypes.BOOLEAN,
      field: 'read_terms',
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, { paranoid: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: function(cliente){
        cliente.name = cliente.name.toUpperCase();
        return cliente;
      },
      beforeUpdate: function(cliente){
        cliente.name = cliente.name.toUpperCase();
        return cliente;
      }
    } 
  })

  ClienteGeneral.prototype.cryptPassword = function (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  ClienteGeneral.associate = models => {
    ClienteGeneral.belongsTo(models.cliente_type)
    ClienteGeneral.hasMany(models.usuario)
  }

  sequelize.sync()

  return ClienteGeneral
}
