const models = require('../models/index')
const errors = require('../const/errors')
const signJWT = require('../middlewares/signJWT')
const Sequelize = models.Sequelize
const Op = Sequelize.Op
const moment = require('moment');


module.exports = {
  login: async (req, res, next) => {
    try {
      const usuario = await models.usuario.findOne({
        where: {
          [Op.or]: [{email: req.body.email}, {username: req.body.email}]
        }
      })
      if (!usuario || !usuario.validPassword(req.body.password)) return next(errors.InvalidCredentials)

      const permi = await models.permiso.findAll({
        order: [
          ['id', 'asc'],
        ],
        include: [{
          model: models.permiso_usuario,
          include: [{
            model: models.usuario,
            where: {
              id: usuario.id
            },
            
            attributes: [],
          }],
          where: [{
            deleted_at: { [Sequelize.Op.is]: null }
          }],
          attributes: [],
        }],
        where: {
          permisoHijoId: { [Sequelize.Op.is]: null }
        }
      })

      //console.log(permi)

      let permisos = await Promise.all(permi.map(async p => { //todos los padres

        per = await models.permiso_usuario.findAll({
          include: [{
            model: models.permiso,
            order: [
              ['id', 'asc'],
            ],
            where: {
              permisoHijoId: p.id
            }
          },
          {
            model: models.usuario,
            where: {
              id: usuario.id
            },
            attributes: [],
          }],
          where: [{
            deleted_at: { [Sequelize.Op.is]: null }
          }],
          attributes: [],
        })
        //console.log(per)
        let result = { permiso_padre: p, permiso_hijo: per }
        return result
      }))

      res.json({
        success: true,
        data: {
          token: signJWT(usuario),
          id: usuario.id,
          usuario: usuario.email, //email
          permisos: permisos
        }
      })
    } catch (err) {
      return next(err)
    }
  }
}