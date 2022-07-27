/**
 * Account model factory to create fake data for testing
 */
const faker = require('faker')
const path = require('path')
const globalConstants = require('../../const/globalConstants')
const sipHelper = require('../../utils/sipHelper')

function defaultProps () {
  return {
    sipUsuarioname: sipHelper.generateUsuarioname(),
    sipPassword: sipHelper.generatePassword(),
    outgoingBalance: faker.random.number({min:0, max: 3600}),
    codec: 'opus',
    startDate: faker.date.recent(),
    dueDate: faker.date.recent()
  }
}

function getFakeAccount (props = {}) {
  return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {}) => {
  return getFakeAccount(props)
}
