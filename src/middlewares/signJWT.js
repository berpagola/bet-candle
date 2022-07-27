const jwt = require('jsonwebtoken')
const config = require('../config/index')

module.exports = function (usuario) {
    if (!usuario) return null
    const token = jwt.sign(
        {
          id: usuario.id
        },
        config.jwtSecret,
        {
          expiresIn: '3000m'
        }
    )
    return token
}