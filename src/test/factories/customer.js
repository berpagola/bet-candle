/**
 * Account model factory to create fake data for testing
 */
const faker = require('faker')
const path = require('path')
const globalConstants = require('../../const/globalConstants')

function defaultProps () {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role: faker.random.arrayElement(globalConstants.CUSTOMER_ROLES),
    ani: faker.random.number({min:10000000000, max: 99999999999}),
    number: faker.random.number({min:10000000000, max: 99999999999}),
    isMobile: faker.random.boolean(),
    country: faker.address.country(),
    state: faker.address.state(),
    county: faker.address.county(),
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    zipCode: parseInt(faker.address.zipCode())
  }
}

function getFakeCustomer (props = {}) {
  return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {}) => {
  return getFakeCustomer(props)
}
