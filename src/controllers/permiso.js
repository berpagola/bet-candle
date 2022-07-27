const models = require('../models/index')
const errors = require('../const/errors')
const signJWT = require('../middlewares/signJWT')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

module.exports = {

  crear: async (req, res, next) => {
    try {

      if (req.body.permisoId) {
        const permiso = await models.permiso.findOne({
          where: {
            id: req.body.permisoId,
          }
        })
        if (!permiso) return next(errors.PermisoInexistente)
        req.body["permisoHijoId"] = req.body.permisoId
      }

      const permiso = await models.permiso.create(req.body)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: permiso.id
        }
      })

    } catch (err) {
      return next(err)
    }
  },

  listar: async (req, res, next) => {
    try {

      const permi = await models.permiso.findAll({
        order: [
          ['id', 'asc'],
        ],
        where: {
          permisoHijoId: { [Sequelize.Op.is]: null }
        }
      })

      let permisos = await Promise.all(permi.map(async p => { //todos los padres

        per = await models.permiso.findAll({
          order: [
            ['id', 'asc'],
          ],
          where: {
            permisoHijoId: p.id
          }
        })
        //console.log(per)
        let result = { permiso_padre: p, permiso_hijo: per }
        return result
      }))

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          permisos: permisos
        }
      })

    } catch (err) {
      return next(err)
    }
  },

  listarActivos: async (req, res, next) => {
    try {

      const permi = await models.permiso.findAll({
        where: {
          state: 1
        },
        order: [
          ['id', 'asc'],
        ],
        where: {
          permisoHijoId: { [Sequelize.Op.is]: null }
        }
      })

      let permisos = await Promise.all(permi.map(async p => { //todos los padres

        per = await models.permiso.findAll({
          order: [
            ['id', 'asc'],
          ],
          where: {
            permisoHijoId: p.id,
            state: 1
          }
        })
        //console.log(per)
        let result = { permiso_padre: p, permiso_hijo: per }
        return result
      }))

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          permisos: permisos
        }
      })

    } catch (err) {
      return next(err)
    }
  },

  listarInfoPermiso: async (req, res, next) => {
    try {
      const permiso = await models.permiso.findOne({
        where: {
          id: req.params.idPermiso
        }
      })
      if (!permiso) return next(errors.PermisoInexistente)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          permiso: permiso
        }
      })

    } catch (err) {
      return next(err)
    }
  },

  modificar: async (req, res, next) => {
    try {

      const permiso = await models.permiso.findOne({
        where: {
          id: req.params.idPermiso,
        }
      })
      if (!permiso) return next(errors.PermisoInexistente)

      if (req.body.nombre_publico)
        req.body.nombre_publico.toUpperCase()

      const permisoModificado = await models.permiso.update(
        req.body,
        {
          where: {
            id: req.params.idPermiso
          }
        })
      if (!permisoModificado) return next(errors.PermisoInexistente)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: permiso.id,
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  activate: async (req, res, next) => {
    try {

      const permiso = await models.permiso.findOne({
        where: {
          id: req.params.idPermiso
        }
      })
      if (!permiso) return next(errors.PermisoInexistente)

      const permisoModificado = await models.permiso.update({
        state: req.body.state
      },
        {
          where: {
            id: req.params.idPermiso
          }
        })
      if (!permisoModificado) return next(errors.PermisoInexistente)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: permiso.id,
        }
      })
    } catch (err) {
      return next(err)
    }
  },

}