const auth = require('basic-auth')

/**
 * Basic authentication middleware. Used to control the access to the API documentation.
 */
module.exports = function (req, res, next) {
  let usuario = auth(req)

  if (usuario === undefined || usuario['username'] !== process.env.APIDOC_USERNAME || usuario['pass'] !== process.env.APIDOC_PASSWORD) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
    res.end('Unauthorized')
  } else {
    next()
  }
}
