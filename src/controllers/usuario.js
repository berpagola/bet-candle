const models = require('../models/index')
const errors = require('../const/errors')
const signJWT = require('../middlewares/signJWT')
const mailer = require('../utils/mailer')
const { sha512 } = require('js-sha512')
const crypto = require('crypto')
const moment = require('moment')
const Sequelize = models.Sequelize
const Op = Sequelize.Op


async function eliminarRelacion(usuario, next) {
  try {

    const permisos = await models.permiso_usuario.findAll({
      where: {
        usuarioId: usuario.id
      }
    })

    permisos.map(l => {
      //console.log(z.id)
      models.permiso_usuario.destroy({
        where: {
          usuarioId: usuario.id
        }
      })
    })
    //console.log('hola')
  } catch (err) {
    return next(err)
  }
}

async function crearPermisos(permisos, usuario, next) {
  try {

    await Promise.all(permisos.map(async l => {
      //console.log(l.id)
      const permiso = await models.permiso.findOne({
        where: {
          id: l.id
        }
      })
      if (permiso) {
        //console.log('wwwww')
        const relacionNueva = await models.permiso_usuario.create({
          permisoId: l.id,
          usuarioId: usuario.id,
          estado: true
        })
      }
    }))
    //console.log('asdasd')
  } catch (err) {
    return next(err)
  }
}

module.exports = {

  createUsuario: async (req, res, next) => {
    try {
      const role = await models.usuario_role.findOne({
        where: {
          id: req.body.role_id
        }
      })
      if (!role) return next(errors.RoleNotFound)

      let transaction

      try {
        transaction = await models.sequelize.transaction()

        const usuarios = await res.locals.usuario.cliente_general.getUsuarios({
          where: {
            state: 1
          }
        })

        //if (usuarios.length >= 10) return next(errors.UsuariosLimit)

        const usuario = await models.usuario.create(
          {
            username: req.body.username,
            nombre: req.body.nombre,
            email: req.body.email,
            usuarioRoleId: req.body.role_id,
            clienteGeneralId: res.locals.usuario.cliente_general.id,
            password: req.body.password,
            state: 1
          },
          { transaction }
        )
        //await usuario.addUsuario_role(role, { transaction })
        usuario.password = usuario.cryptPassword(usuario.password)

        await usuario.save({ transaction })

        if (req.body.permisos) {
          //console.log(usuario.id)
          await Promise.all(req.body.permisos.map(async e => {
            const permiso = await models.permiso.findOne({ //permiso hijo
              where: {
                id: e.id
              }
            })
            if (permiso) {
              const permisoAsignado = await models.permiso_usuario.findOne({
                where: {
                  usuarioId: usuario.id,
                  permisoId: e.id,
                  estado: true
                }
              })
              if (!permisoAsignado) {
                //console.log('asdasd')
                const permiso_usuario = await models.permiso_usuario.create({
                  usuarioId: usuario.id,
                  permisoId: e.id,
                  estado: true,
                  //fecha_baja:
                }, { transaction })
              }
            }
          }))
        }

        await transaction.commit()


        const token = crypto.randomBytes(24).toString("hex")

        usuario.resetToken = sha512(token)
        usuario.resetTime = moment().add(12, 'h').toDate()

        await usuario.save()

        let asunto = "Bienvenido a Integrah"
        let mensaje = "<b>Le han creado una nueva cuenta en la plataforma de Integrah, para poder definir su contraseña de acceso dirijase al siguiente link \n http://integrah.com.ar/reset/" + token + "</b>"
        /*
                try {
                  const response = await mailer.send(req.body.email, asunto, mensaje)
                } catch (err) {
                  throw (err)
                }*/

        res.json({
          success: true,
          token: signJWT(res.locals.usuario),
          data: {
            id: usuario.id,
            username: req.body.username,
            nombre: req.body.nombre,
            email: usuario.email,
            state: usuario.state,
            roles: [
              {
                name: role.name,
                description: role.description
              }
            ]
          }
        })
      } catch (e) {
        await transaction.rollback()
        throw e
      }
    } catch (err) {
      return next(err)
    }
  },

  updateUsuario: async (req, res, next) => {
    try {
      const role = await models.usuario_role.findOne({
        where: {
          id: req.body.role_id
        }
      })
      if (!role) return next(errors.RoleNotFound)

      const usuario = await models.usuario.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!usuario) return next(errors.UsuarioNotFound)

      if (req.body.modificarPermisos == true) {
        await eliminarRelacion(usuario, next)
        await crearPermisos(req.body.permisos, usuario, next)
      }

      const updateUsuario = await models.usuario.update(
        {
          username: req.body.username,
          nombre: req.body.nombre,
          usuarioRoleId: req.body.role_id,
          email: req.body.email,
          //password: req.body.password,
        },
        {
          //individualHooks: true,
          where: {
            id: req.params.id
          }
        }
      )
      if (!updateUsuario) return next(errors.UsuarioNotFound)

      const updatedUsuarioo = await models.usuario.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!updatedUsuarioo) return next(errors.UsuarioNotFound)

      
      if(req.body.password){
        updatedUsuarioo.password = req.body.password
        await updatedUsuarioo.save()  
      }

      if(req.body.password){
        updatedUsuarioo.password = updatedUsuarioo.cryptPassword(updatedUsuarioo.password)
        await updatedUsuarioo.save()  
      }

      

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: updatedUsuarioo.id,
          username: updatedUsuarioo.username,
          nombre: updatedUsuarioo.nombre,
          email: updatedUsuarioo.email,
          state: updatedUsuarioo.state,
          roles: [
            {
              name: role.name,
              description: role.description
            }
          ]
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  modificarPassword: async (req, res, next) => {
    try {

      const updateUsuario = await models.usuario.update(
        {
          password: req.body.password,
        },
        {
          //individualHooks: true,
          where: {
            id: req.params.id
          }
        }
      )
      if (!updateUsuario) return next(errors.UsuarioNotFound)

      const updatedUsuarioo = await models.usuario.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!updatedUsuarioo) return next(errors.UsuarioNotFound)

      updatedUsuarioo.password = updatedUsuarioo.cryptPassword(updatedUsuarioo.password)

      await updatedUsuarioo.save()

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: updatedUsuarioo.id,
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  activateUsuario: async (req, res, next) => {
    try {

      const updateUsuario = await models.usuario.update(
        {
          state: req.body.state
        },
        {
          individualHooks: true,
          where: {
            id: req.params.id
          }
        }
      )

      if (!updateUsuario) return next(errors.UsuarioNotFound)

      const updatedUsuario = await models.usuario.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!updatedUsuario) return next(errors.UsuarioNotFound)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          id: updatedUsuario.id,
          username: updatedUsuario.username,
          nombre: updatedUsuario.nombre,
          email: updatedUsuario.email,
          state: updatedUsuario.state,
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  listUsuarios: async (req, res, next) => {
    try {
      const usuarios = await res.locals.usuario.cliente_general.getUsuarios({
        order: [
          ['state', 'ASC'],
          ['username', 'ASC'],
        ]
      })
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          usuarios: await Promise.all(usuarios.map(async u => {
            const roles = await u.getUsuario_role()
            return {
              id: u.id,
              username: u.username,
              nombre: u.nombre,
              email: u.email,
              state: u.state,
              role_id: roles.id,
              role_name: roles.name
            }
          }))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  listarInfoUsuario: async (req, res, next) => {
    try {

      const updatedUsuario = await models.usuario.findOne({
        where: {
          id: req.params.idUsuario
        }
      })
      if (!updatedUsuario) return next(errors.UsuarioNotFound)

      const usuario = await res.locals.usuario.cliente_general.getUsuarios({
        where: {
          id: req.params.idUsuario
        }
      })

      // console.log(usuario.usuario_role)
      const rol = await usuario[0].getUsuario_role()

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          /*usuarios: await Promise.all(usuarios.map(async u => {
            const roles = await u.getUsuario_role()
            return {
              id: u.id,
              username: u.username,
              nombre: u.nombre,
              email: u.email,
              state: u.state,
              role_id: roles.id,
              role_name: roles.name
            }
          }))*/
          id: usuario[0].id,
          username: usuario[0].username,
          nombre: usuario[0].nombre,
          email: usuario[0].email,
          state: usuario[0].state,
          role_id: rol.id,
          role_name: rol.name
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  listarActivos: async (req, res, next) => {
    try {
      const usuarios = await res.locals.usuario.cliente_general.getUsuarios({
        order: [
          ['state', 'ASC'],
          ['username', 'ASC'],
        ],
        where: {
          state: 1
        }
      })
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          usuarios: await Promise.all(usuarios.map(async u => {
            const roles = await u.getUsuario_role()
            return {
              id: u.id,
              username: u.username,
              nombre: u.nombre,
              email: u.email,
              state: u.state,
              role_id: roles.id,
              role_name: roles.name
            }
          }))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  listRoles: async (req, res, next) => {
    try {
      const roles = await models.usuario_role.findAll()
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          roles: roles.map(r => {
            return {
              id: r.id,
              name: r.name,
              description: r.description
            }
          })
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  search: async (req, res, next) => {
    try {
      const term = req.query.term || ''
      const usuarios = await res.locals.usuario.cliente_general.getUsuarios({
        where:
        {
          username: { [Op.like]: `%${term.toUpperCase()}%` }
        },
        order: [
          ['state', 'ASC'],
          ['username', 'ASC'],
        ]
      })
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          usuarios: await Promise.all(usuarios.map(async u => {
            const roles = await u.getUsuario_role()
            return {
              id: u.id,
              email: u.email,
              state: u.state,
              role_id: roles.id,
              role_name: roles.name
            }
          }))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  listarPermisos: async (req, res, next) => {
    try {

      const updatedUsuarioo = await models.usuario.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!updatedUsuarioo) return next(errors.UsuarioNotFound)


      const permisos = await updatedUsuarioo.getPermiso_usuarios({
        include: [{
          model: models.permiso
        }],
      })

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
}