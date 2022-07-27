/**
 * Card model factory to create fake data for testing
 */
const faker = require('faker')
const path = require('path')
const globalConstants = require('../../const/globalConstants')

function defaultProps () {
  return {
    isUsed: faker.random.boolean(),
    type: faker.random.arrayElement(globalConstants.CARD_TYPES),
    pin: faker.random.number({min:10000000000, max: 99999999999}),
    days: faker.random.arrayElement([30,60,90])
  }
}

function getFakeCard (props = {}) {
  return Object.assign({}, defaultProps(), props)
}

module.exports = (props = {}) => {
  return getFakeCard(props)
}
