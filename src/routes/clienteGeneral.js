let express = require('express')
let router = express.Router()
let validate = require('../middlewares/validate')
let clienteController = require('../controllers/clienteGeneral')
let clienteTypeScheme = require('../middlewares/schemes/clientetypes')
let clienteTypeController = require('../controllers/clientetype')

/**
 * @api {post} /api/clients/ Create a client
 * @apiName CreateClient
 * @apiGroup Clients
 *
 * @apiParam {Number} client_type_id Client type ID
 * @apiParam {String} name Client name
 * @apiParam {String} cuit Client CUIT
 * @apiParam {String} phone Client phone number
 * @apiParam {String} address Client address
 * @apiParam {Double} monthly_bill Client monthly bill
 * @apiParam {Integer} active_date Client active date
 * @apiParam {Object} admin Info of the admin usuario to be created with the client
 * @apiParam {String} admin.name Admin name
 * @apiParam {String} admin.email Admin email
 * @apiParam {String} admin.password Admin password
 * @apiParam {Integer} admin.state Admin account state
 * @apiParam {String} admin.position Admin position
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "id": "9",
 *         "name": "Entidad Test",
 *         "client_type": "Tipo 1",
 *         "cuit": "20111111116",
 *         "phone": "02215471235",
 *         "monthly_bill": "100.5",
 *         "active_date": 1551050569,
 *         "admin": {
 *           "id": "8",
 *           "name": "Usuario Test",
 *           "email": "usuario@integra.com",
 *           "state": 1,
 *           "position": "CEO"
 *         }
 *       }
 *     } 
 *
 * @apiUse ClientTypeNotFound
 * @apiUse MissingParameters
 * @apiUse ValidationError
 *
 */
router.post('/', clienteController.create)

/**
 * @api {get} /api/clients/ Get a list of clients
 * @apiName ListClients
 * @apiGroup Clients
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "clients": [
 *           {
 *             "id": "9",
 *             "name": "Entidad Test",
 *             "client_type": "Tipo 1",
 *             "cuit": "20111111116",
 *             "phone": "02215471235",
 *             "monthly_bill": "100.5",
 *             "active_date": 1551050569,
 *             "admin": {
 *               "id": "8",
 *               "name": "Usuario Test",
 *               "email": "usuario@integra.com",
 *               "state": 1,
 *               "position": "CEO"
 *             }
 *           }
 *         ]
 *       }
 *     }
 *
 */
router.get('/', clienteController.list)

/**
 * @api {post} /api/clients/types Create a client type
 * @apiName CreateClientType
 * @apiGroup Clients
 *
 * @apiParam {String} name Type name
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "id": "2",
 *         "name": "Some type"
 *       }
 *     }     
 *
 *
 * @apiUse MissingParameters
 * @apiUse ValidationError
 *
 */
router.post('/types', validate(clienteTypeScheme.createType), clienteTypeController.create)

/**
 * @api {get} /api/clients/types/ Get list of client types
 * @apiName ListClientTypes
 * @apiGroup Clients
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "types": [
 *           {
 *              "id": "1",
 *              "name": "Some type",
 *           }
 *         ]
 *       }
 *     }
 * 
 */
router.get('/types', clienteTypeController.list)

/**
 * @api {get} /api/clients/types/ Get list of client types
 * @apiName ListClientTypes
 * @apiGroup Clients
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "types": [
 *           {
 *              "id": "1",
 *              "name": "Some type",
 *           }
 *         ]
 *       }
 *     }
 * 
 */
router.get('/search/', clienteController.search)

/**
 * @api {put} /api/clients/:id Create a client
 * @apiName UpdateClient
 * @apiGroup Clients
 *
 * @apiParam {Number} client_type_id Client type ID
 * @apiParam {String} name Client name
 * @apiParam {String} cuit Client CUIT
 * @apiParam {String} phone Client phone number
 * @apiParam {String} address Client address
 * @apiParam {Double} monthly_bill Client monthly bill
 * @apiParam {Integer} active_date Client active date
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "id": "9",
 *         "name": "Entidad Test",
 *         "client_type": "Tipo 1",
 *         "cuit": "20111111116",
 *         "phone": "02215471235",
 *         "address": "calle 6",
 *         "monthly_bill": "100.5",
 *         "active_date": 1551050569,
 *         
 *       }
 *     } 
 *
 * @apiUse ClientTypeNotFound
 * @apiUse MissingParameters
 * @apiUse ValidationError
 *
 */
router.put('/:id', clienteController.put)

/**
 * @api {put} /api/clients/:id Create a client
 * @apiName UpdateClient
 * @apiGroup Clients
 *
 * @apiParam {Number} client_type_id Client type ID
 * @apiParam {String} name Client name
 * @apiParam {String} cuit Client CUIT
 * @apiParam {String} phone Client phone number
 * @apiParam {String} address Client address
 * @apiParam {Double} monthly_bill Client monthly bill
 * @apiParam {Integer} active_date Client active date
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *         "id": "9",
 *         "name": "Entidad Test",
 *         "client_type": "Tipo 1",
 *         "cuit": "20111111116",
 *         "phone": "02215471235",
 *         "address": "calle 6",
 *         "monthly_bill": "100.5",
 *         "active_date": 1551050569,
 *         
 *       }
 *     } 
 *
 * @apiUse ClientTypeNotFound
 * @apiUse MissingParameters
 * @apiUse ValidationError
 *
 */
router.put('/acceptTerms/:id', clienteController.acceptTerms)

module.exports = router
