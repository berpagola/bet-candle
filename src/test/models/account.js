process.env.ENVIRONMENT = 'test'

const path = require('path')
const expect = require('chai').expect
const models = require(path.join(__dirname, '/../../models/index'))

const accountFactory = require(path.join(__dirname, '/../factories/account'))
const customerFactory = require(path.join(__dirname, '/../factories/customer'))

let accountMock, customerMock

describe('Account model', () => {

  before(async () => {
    await models.account.destroy({
      where: {}
    })
  })

  beforeEach((done) => {
    accountMock = accountFactory()
    done()
  })

  it('should create an account', async () => {
    let account = await models.account.create(accountMock)
    expect(account.dataValues).to.have.property('id')
  })

  it('should access to customers associations', async () => {
    let buyerMock = customerFactory()
    buyerMock.role = 'BUYER'
    let buyer = await models.customer.create(buyerMock)

    let contactMock = customerFactory()
    contactMock.role = 'CONTACT'
    let contact = await models.customer.create(contactMock)

    let account = await models.account.create(accountMock)
    account.setBuyer(buyer)
    account.setContact(contact)
    
    let accountBuyer = await account.getBuyer()
    expect(accountBuyer.id).eql(buyer.id)

    let accountContact = await account.getContact()
    expect(accountContact.id).eql(contact.id)
  })

  after(async () => {
    await models.account.destroy({
      where: {}
    })
  })

})
