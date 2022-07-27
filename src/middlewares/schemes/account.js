const Joi = require('joi')

let recoverPassword = Joi.object({
  email: Joi.string().required()
})

let resetPassword = Joi.object({
  reset_token: Joi.string().required(),
  password: Joi.string().required()
})

let createUsuario = Joi.object({
  username: Joi.string().required(),
  nombre: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  state: Joi.number().required(),
  position: Joi.string().required()
})

module.exports = {
  recoverPassword,
  resetPassword,
  createUsuario
}
