let express = require('express')
let router = express.Router()
let validate = require('../middlewares/validate')
let authScheme = require('../middlewares/schemes/auth')
let authController = require('../controllers/auth')
let accountController = require('../controllers/account')
let accountScheme = require('../middlewares/schemes/account')


router.post('/login/', validate(authScheme.login), authController.login)
router.post('/recover/', validate(accountScheme.recoverPassword), accountController.generateRecoveryToken)
router.post('/reset/', validate(accountScheme.resetPassword), accountController.resetPassword)

module.exports = router