const jwt = require('jsonwebtoken')
const errors = require('../const/errors')
const config = require('../config/index')
const models = require('../models/index')
const moment = require('moment')

/**
 * Json Web Token decodification.
 */
module.exports = async function (req, res, next) {
  if (req.header('Authorization') && req.header('Authorization').split(' ').length > 1) {
    try {
      let data = jwt.verify(req.header('Authorization').split(' ')[1], config.jwtSecret)
      //console.log(data.exp)
      //console.log(moment().unix())
      if (data.exp <= moment().unix()) return next(errors.SessionExpired)

      res.locals.token = data
      const usuario = await models.usuario.findOne({
        where: {
          id: data.id
        },
        include: [
          {
            model: models.cliente_general,
            as: 'cliente_general'
          }
        ]
      })
      if (!usuario) return next(errors.UsuarioUnauthorized)

      res.locals.usuario = usuario
      next()
    } catch (err) {
      return next(errors.SessionExpired)
    }
  } else {
    return next(errors.UsuarioUnauthorized)
  }
}
