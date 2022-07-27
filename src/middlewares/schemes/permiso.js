const Joi = require('joi')

let crear = Joi.object({
  nombre_publico: Joi.string().required(),
  nombre_interno: Joi.string().allow('').optional(),
  descripcion: Joi.string().allow('').optional(),
  permisoId: Joi.number().optional(),
})

let activate = Joi.object({
  state: Joi.number().required()
})

module.exports = {
  crear,
  activate
}
