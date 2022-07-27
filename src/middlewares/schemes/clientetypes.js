const Joi = require('joi')

let createType = Joi.object({
  name: Joi.string().required()
})

module.exports = {
  createType
}
