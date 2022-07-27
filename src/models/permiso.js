'use strict'

const globalConstants = require('../const/globalConstants')

module.exports = (sequelize, DataTypes) => {
  let Permiso = sequelize.define('permiso', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre_publico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'El nombre_publico ya existe'
      },
    },
    nombre_interno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'El nombre_interno ya existe'
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: { // para activate
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'el state no puede ser vacio'
        }
      },
      defaultValue: 1
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
  })

  Permiso.associate = models => {
    Permiso.hasOne(models.permiso, {as: 'permiso_hijo'})
    Permiso.hasMany(models.permiso_usuario)
  }

  sequelize.sync()

  return Permiso
}
