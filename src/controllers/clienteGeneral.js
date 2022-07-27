const models = require('../models/index')
const errors = require('../const/errors')
const moment = require('moment')
const crypto = require('crypto')
const signJWT = require('../middlewares/signJWT')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

getClientData = async (clienteGeneral) => {
  const data = {
    id: clienteGeneral.id,
    name: clienteGeneral.name,
    cliente_type: clienteType.name,
    cliente_type_id: clienteType.id,
    cuit: clienteGeneral.cuit,
    phone: clienteGeneral.phone,
    address: clienteGeneral.address,
    monthly_bill: clienteGeneral.monthlyBill,
    active_date: moment(clienteGeneral.activeDate).unix(),
  }
  return data
}
getClientDataNoAdmin = async (clienteGeneral) => {
  const clienteType = await clienteGeneral.getCliente_type()

  const data = {
    id: clienteGeneral.id,
    name: clienteGeneral.name,
    cliente_type: clienteType.name,
    cliente_type_id: clienteType.id,
    cuit: clienteGeneral.cuit,
    phone: clienteGeneral.phone,
    address: clienteGeneral.address,
    monthly_bill: clienteGeneral.monthlyBill,
    active_date: moment(clienteGeneral.activeDate).unix(),
    readTerms: clienteGeneral.readTerms
  }
  return data
}

module.exports = {
  create: async (req, res, next) => {
    try {

      let transaction

      try {
        transaction = await models.sequelize.transaction()

        const clienteGeneral = await models.cliente_general.create({
          clienteTypeId: 1,
          name: req.body.name,
          cuit: req.body.cuit,
          phone: req.body.phone,
          address: req.body.address,
          monthlyBill: req.body.monthly_bill,
          activeDate: moment.unix(req.body.active_date).toDate()
        }, { transaction })

        const admin = await models.usuario.create({
          clienteGeneralId: clienteGeneral.id,
          username: req.body.admin.username,
          nombre: req.body.admin.nombre,
          email: req.body.admin.email,
          state: req.body.admin.state,
          position: req.body.admin.position,
          usuarioRoleId: 1,
          password: req.body.admin.password
        }, { transaction })

        admin.password = admin.cryptPassword(admin.password)

        await admin.save({transaction})


        // const result = await Promise.all(
        //   [
        //     clienteType.getPermissions(), 
        //     clienteGeneral.setAdministrator(admin, { transaction })
        //   ]
        // )
        //const permissions = result[0]

        // const role = await models.usuario_role.create({
        //   clienteId: clienteGeneral.id,
        //   name: 'admin',
        //   description: 'Rol administrador de la entidad'
        // }, { transaction })
        //await Promise.all(permissions.map(p => { return role.addPermission(p, { transaction }) }))
        //await admin.addUsuario_role(role, { transaction })

        await transaction.commit()

        res.json({
          success: true,
          data: {
            clienteGeneral: clienteGeneral
          }
        })
      } catch (error) {
        await transaction.rollback()
        throw error
      }
    } catch (err) {
      return next(err)
    }
  },

  list: async (req, res, next) => {
    try {
      const clienteGeneral = await models.cliente_general.findAll()
      
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          clienteGeneral: await Promise.all(clienteGeneral.map(c => { return getClientDataNoAdmin(c) }))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  put: async (req, res, next) => {
    try {
      const clienteType = await models.cliente_type.findOne({
        where: {
          id: req.body.cliente_type_id
        }
      })
      if (!clienteType) return next(errors.ClientTypeNotFound)

      const updateClient = await models.cliente_general.update({
        clienteTypeId: req.body.cliente_type_id,
        name: req.body.name,
        cuit: req.body.cuit,
        phone: req.body.phone,
        address: req.body.address,
        monthlyBill: req.body.monthly_bill,
        activeDate: moment.unix(req.body.active_date).toDate()
      },
        {
          individualHooks: true,
          where: {
            id: req.params.id
          }
        })
      if (!updateClient) return next(errors.BrandNotFound)

      const clienteGeneral = await models.cliente_general.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!clienteGeneral) return next(errors.ClientTypeNotFound)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: await getClientDataNoAdmin(clienteGeneral)
      })
    } catch (err) {
      return next(err)
    }
  },

  search: async (req, res, next) => {
    try {
      const term = req.query.term || ''
      const clientesGeneral = await models.cliente_general.findAll({
        where:
        {
          name: { [Op.like]: `%${term.toUpperCase()}%`}
        },
        order: [
          ['name', 'ASC'],
        ]
      })
      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: {
          clientesGeneral: await Promise.all(clientesGeneral.map(c => { return getClientDataNoAdmin(c) }))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  acceptTerms: async (req, res, next) => {
    try {
      const updateClient = await models.cliente_general.update({
        readTerms: true
      },
        {
          individualHooks: true,
          where: {
            id: req.params.id
          }
        })
      if (!updateClient) return next(errors.BrandNotFound)

      const clienteGeneral = await models.cliente_general.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!clienteGeneral) return next(errors.ClientTypeNotFound)

      res.json({
        success: true,
        token: signJWT(res.locals.usuario),
        data: await getClientDataNoAdmin(clienteGeneral)
      })
    } catch (err) {
      return next(err)
    }
  }
  
}