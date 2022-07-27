const Joi = require('joi')

let createUsuario = Joi.object({
    username: Joi.string().required(),
    nombre: Joi.string().required(),
    email: Joi.string().required(),
    state: Joi.number().required(),
    role_id: Joi.number().required(),
    password: Joi.string().required()
})

let updateUsuario = Joi.object({
    username: Joi.string().required(),
    nombre: Joi.string().required(),
    email: Joi.string().required(),
    role_id: Joi.number().required(),
    password: Joi.string().required()
})

let activateUsuario = Joi.object({
    state: Joi.number().required()
})

module.exports = {
    createUsuario,
    updateUsuario,
    activateUsuario
}