'use strict'

const globalConstants = require('../const/globalConstants')

module.exports = (sequelize, DataTypes) => {
  let UsuarioRole = sequelize.define('usuario_role', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La descripcion no puede ser vacio'
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
  }, { paranoid: true, freezeTableName: true })

  UsuarioRole.associate = models => {
    //UsuarioRole.belongsTo(models.client)
    //UsuarioRole.belongsToMany(models.usuario, { through: 'usuario_role_user' })
    UsuarioRole.hasMany(models.usuario)
  }

  sequelize.sync()

  return UsuarioRole
}
