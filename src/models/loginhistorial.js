'use strict'

const globalConstants = require('../const/globalConstants')
const { UsuarioInexistente } = require('../const/errors')

module.exports = (sequelize, DataTypes) => {
  let LoginHistorial = sequelize.define('login_historial', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    resultado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioInexistente: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { paranoid: true, freezeTableName: true})

  LoginHistorial.associate = models => {
    LoginHistorial.belongsTo(models.usuario)
  }

  sequelize.sync()

  return LoginHistorial
}
