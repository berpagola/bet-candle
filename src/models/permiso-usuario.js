'use strict'

const globalConstants = require('../const/globalConstants')

module.exports = (sequelize, DataTypes) => {
  let PermisoUsuario = sequelize.define('permiso_usuario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fecha_baja: {
      type: DataTypes.DATE,
      allowNull: true,
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

  PermisoUsuario.associate = models => {
    PermisoUsuario.belongsTo(models.permiso)
    PermisoUsuario.belongsTo(models.usuario)
  }

  sequelize.sync()

  return PermisoUsuario
}
