const models = require('../models/index')
const errors = require('../const/errors')
const mailer = require('../utils/mailer')
const { sha512 } = require('js-sha512')
const crypto = require('crypto')
const moment = require('moment')

module.exports = {
  /*
   * This method is for testing only
   */
  createUsuario: async (req, res, next) => {
    try {
      const usuario = await models.usuario.create({
        username: req.body.username,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        state: req.body.state,
        position: req.body.position
      })

      res.json({
        success: true,
        data: usuario
      })
    } catch (err) {
      return next(err)
    }
  },

  generateRecoveryToken: async (req, res, next) => {
    try {
      const usuario = await models.usuario.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!usuario) return next(errors.UsuarioNotFound)

      var em = usuario.email
      const t = crypto.randomBytes(24).toString("hex")

      const usuarioModificado = await models.usuario.update(
        {
          reset_token: sha512(t),
          reset_time: moment().add(12, 'h').toDate()
        },
        {
          where: {
            id: usuario.id
          }
        })
      if (!usuarioModificado) return next(errors.UsuarioInexistente)
      
      res.json({
        success: true,
        msg: 'Email enviado'
      })

      //await mail(em,t,next)

    } catch (err) {
      return next(err)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const usuario = await models.usuario.findOne({
        where: {
          reset_token: sha512(req.body.reset_token)
        }
      })
      if (!usuario) return next(errors.UsuarioNotFound)
      if (moment().toDate() > usuario.reset_time) return next(errors.TokenExpired)

      usuario.password = usuario.cryptPassword(req.body.password)
      usuario.reset_token = null
      usuario.reset_time = null

      await usuario.save()

      res.json({
        success: true,
        msg: 'Usuario actualizado correctamente'
      })

    } catch (err) {
      return next(err)
    }
  }
}