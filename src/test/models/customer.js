process.env.ENVIRONMENT = 'test'

const path = require('path')
const expect = require('chai').expect
const models = require(path.join(__dirname, '/../../models/index'))

const customerFactory = require(path.join(__dirname, '/../factories/customer'))

let customerMock

describe('Customer model', () => {

  before(async () => {
    await models.customer.destroy({
      where: {}
    })
  })

  beforeEach((done) => {
    customerMock = customerFactory()
    done()
  })

  it('should create a customer', async () => {
    let customer = await models.customer.create(customerMock)
    expect(customer.dataValues).to.have.property('id')
  })

  it('should create a customer without address information', async () => {
    let mock = customerMock
    mock.role = 'BUYER'
    mock.firstName = null
    mock.lastName = null
    mock.country = null
    mock.state = null
    mock.county = null
    mock.city = null
    mock.address = null
    let customer = await models.customer.create(customerMock)
    expect(customer.dataValues).to.have.property('id')
  })

  it('shouldn\'t create a customer without ANI', async () => {
    let mock = customerMock
    mock.ani = null
    try {
      let customer = await models.customer.create(mock)
      expect(customer).to.be('undefined')
    } catch (e) {
      expect(e.name).eql('SequelizeValidationError')
    }
  })

  after(async () => {
    await models.customer.destroy({
      where: {}
    })
  })

})
