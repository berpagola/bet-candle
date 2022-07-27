'use strict'

const globalConstants = require('../const/globalConstants')
const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize, DataTypes) => {
  let Usuario = sequelize.define('usuario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre de usuario no puede ser vacio'
        }
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'El email ya existe'
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reset_token: {
      type: DataTypes.STRING,
      field: 'reset_token',
      allowNull: true,
      unique: true
    },
    reset_time: {
      type: DataTypes.DATE,
      field: 'reset_time',
      allowNull: true
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
  },
  { 
    paranoid: true,
    freezeTableName: true,
    hooks: {
      /*beforeCreate: (usuario) => {
        usuario.username = usuario.username.toUpperCase()
        usuario.email = usuario.email.toLowerCase()
        const salt = bcrypt.genSaltSync(10)
        usuario.password = bcrypt.hashSync(usuario.password, salt)
      },*/
      /*beforeUpdate: (usuario) => {
        usuario.username = usuario.username.toUpperCase()
        usuario.email = usuario.email.toLowerCase()
        const salt = bcrypt.genSaltSync(10)
        usuario.password = bcrypt.hashSync(usuario.password, salt)
      }*/
      
    }}
  )

  Usuario.prototype.cryptPassword = function (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  
  Usuario.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  Usuario.prototype.tokenData = async function() {
    return {}
  }

  Usuario.associate = models => {
    Usuario.belongsTo(models.cliente_general)
    Usuario.belongsTo(models.usuario_role)
    Usuario.hasMany(models.permiso_usuario)
  }

  sequelize.sync()

  return Usuario
}
