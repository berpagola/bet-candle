const errors = require('../const/errors')
/**
 * Error management
 */
module.exports = function (err, req, res, next) {
  /**
   * If a custom error was throwed, load it's information
   * If it's not the case, load default error values
   */
  let response = {
    success: false,
    error: {
      code: err.code || 500,
      message: err.message || 'Internal server error'
    }
  }

  /**
   * Sequelize validation error (from the model)
   */
  if (err.name === 'SequelizeValidationError') {
    let validationError = err.errors[0]
    response.error.code = errors['ValidationError'].code
    response.error.message = validationError.message
  }

  /**
   * Joi Validation error (from the middleware)
   */
  if (err.isJoi) {
    let validationErrorType = err.details[0].type
    let errorKey = 'ValidationError'
    if (validationErrorType === 'any.required') {
      errorKey = 'MissingParameters'
    }
    response.error.code = errors[errorKey].code
    response.error.message = errors[errorKey].message
  }

  /**
   * 404 Not Found error
   */
  if (err.message === 'Not Found') {
    response.error.code = 404
    response.error.message = 'Not Found'
  }

  /**
   * CORS not allowed error
   */
  if (err.message === 'Not allowed by CORS') {
    response.error.code = 403
  }

  /**
   * Sequelize error produced when a value is out of the range of the defined type
   */
  if (err.name === 'SequelizeDatabaseError' && err.message.indexOf('out of range') >= 0) {
    response.error.code = errors['ValidationError'].code
    response.error.message = errors['ValidationError'].message
  }

  /**
   * Sequelize connection error with the database
   */
  if (err.name === "SequelizeConnectionError") {
    response.error.code = 500
    response.error.message = 'Internal server error'
  }

  res.status(200).json(response)
}
