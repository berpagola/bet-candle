/**
 * PANumber model factory to create fake data for testing
 */
const faker = require('faker')
const path = require('path')

function defaultProps () {
  return {
    phoneNumber: faker.random.number({min:10000000000, max: 99999999999})
  }
}

function getFakePANumber (props = {}) {
  return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {}) => {
  return getFakePANumber(props)
}
