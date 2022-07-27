const models = require('../models/index')
const errors = require('../const/errors')
const Sequelize = models.Sequelize
const Op = Sequelize.Op

module.exports = {
  create: async (req, res, next) => {
    try {
      const type = await models.cliente_type.create(req.body)
      res.json({
        success: true,
        data: (({id, name}) => ({id, name}))(type)
      })
    } catch (err) {
      return next(err)
    }
  },

  list: async (req, res, next) => {
    try {
      const types = await models.cliente_type.findAll()
      res.json({
        success: true,
        data: {
          types: types.map(t => { return { id: t.id, name: t.name } })
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  search: async (req, res, next) => {
    try {
      const term = req.query.term || ''
      const types = await models.cliente_type.findAll({
        where: Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('name')),
          {
            [Op.like]: `%${term.toLowerCase()}%`
          }
        )
      })
      res.json({
        success: true,
        data: {
          types: types.map(t => { return { id: t.id, name: t.name } })
        }
      })
    } catch (err) {
      return next(err)
    }
  }
}