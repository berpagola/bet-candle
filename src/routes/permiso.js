let express = require('express')
let router = express.Router()
let validate = require('../middlewares/validate')
let permisoSchema = require('../middlewares/schemes/permiso')
let permisoController = require('../controllers/permiso')


router.put('/:idPermiso', validate(permisoSchema.crear), permisoController.modificar) 
router.post('/', validate(permisoSchema.crear), permisoController.crear) 
router.get('/', permisoController.listar) 
router.get('/listarActivos', permisoController.listarActivos) 
router.get('/:idPermiso', permisoController.listarInfoPermiso)
router.put('/activate/:idPermiso', validate(permisoSchema.activate), permisoController.activate)  


module.exports = router
