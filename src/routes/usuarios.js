let express = require('express')
let router = express.Router()
let validate = require('../middlewares/validate')
let userScheme = require('../middlewares/schemes/usuarios')
let userController = require('../controllers/usuario')


router.get('/roles', userController.listRoles)
router.get('/listarActivos', userController.listarActivos)
router.get('/search', userController.search)

router.get('/listarPermisos/:id', userController.listarPermisos)
router.put('/editPassword/:id', validate(userScheme.modificarContraseña), userController.modificarPassword)
router.put('/activate/:id', validate(userScheme.activateUsuario), userController.activateUsuario)

router.get('/:idUsuario', userController.listarInfoUsuario)
router.put('/:id', validate(userScheme.updateUsuario), userController.updateUsuario)

router.post('/', validate(userScheme.createUsuario), userController.createUsuario)
router.get('/', userController.listUsuarios)

module.exports = router
