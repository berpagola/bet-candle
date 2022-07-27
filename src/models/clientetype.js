'use strict'

const globalConstants = require('../const/globalConstants')

module.exports = (sequelize, DataTypes) => {
  let ClienteType = sequelize.define('cliente_type', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "El tipo ya existe"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre no puede ser vacio'
        }
      }
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
  }, { paranoid: true, freezeTableName: true})

  ClienteType.associate = models => {
    ClienteType.hasMany(models.cliente_general)
    //ClientType.hasMany(models.permission)
  }

  sequelize.sync()

  return ClienteType
}
