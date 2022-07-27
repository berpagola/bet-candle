const Joi = require('joi')

let createClient = Joi.object({
  name: Joi.string().required(),
  clienteTypeId: Joi.number().required(),
  cuit: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  monthly_bill: Joi.number().required(),
  active_date: Joi.number().required(),
  admin: Joi.object({
    username: Joi.string().required(),
    nombre: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    state: Joi.number().required(),
    position: Joi.string().required(),
    password: Joi.string().required(),
  })
})

module.exports = {
  createClient
}
