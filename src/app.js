let createError = require('http-errors')
let express = require('express')
let path = require('path')
let logger = require('morgan')
let helmet = require('helmet')
let cors = require('cors')
let bodyParser = require('body-parser')

let config = require('./config/index')

let indexRouter = require('./routes/index')
const clientesGeneralRouter = require('./routes/clienteGeneral')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/usuarios')
//const accountsRouter = require('./routes/accounts')


// --------------------------------- BASE ---------------------------------------- //

const permisoRouter = require('./routes/permiso')

// -------------------------------------------------------------------------------- //


let errorHandler = require('./middlewares/error')
let basicAuth = require('./middlewares/basicAuth')
let decodeJWT = require('./middlewares/decodeJWT')
//let authentication = require('./middlewares/authentication')

let app = express()

/**
 * CORS configuration
 */
let whitelist = config.allowedOrigins
let apiKey = config.apiKey

let corsOptions = {
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range', 'X-Api-Key'],
  credentials: true,
  optionsSuccessStatus: 200
}

let corsOptionsDelegate = function (req, callback) {
  let originIsWhitelisted = true;//req.header('Origin') && whitelist.indexOf(req.header('Origin')) !== -1
  let originIsAuthorized = req.header('x-api-key') && req.header('x-api-key') === apiKey
  corsOptions.origin = originIsWhitelisted || originIsAuthorized
  callback(originIsWhitelisted || originIsAuthorized? null : new Error('Not allowed by CORS'), corsOptions)
}

app.use(helmet())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/doc', basicAuth, express.static(path.join(__dirname, 'apidoc')))

app.options('*', cors(corsOptions))
app.use(cors(corsOptionsDelegate))

app.use('/api/', indexRouter)
app.use('/api/auth', authRouter)

// This router has to be protected for super admin only
app.use('/api/clientesGeneral', clientesGeneralRouter)
//app.use('/api/accounts', accountsRouter)

app.use('/api/usuarios', decodeJWT, usersRouter)
//app.use('/api/usuarios', usuariosRouter)

// --------------------------------- BASE ---------------------------------------- //

app.use('/api/permisos', decodeJWT, permisoRouter)

// -------------------------------------------------------------------------------- //

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(errorHandler)

module.exports = app 
