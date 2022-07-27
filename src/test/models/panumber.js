process.env.ENVIRONMENT = 'test'

const path = require('path')
const expect = require('chai').expect
const models = require(path.join(__dirname, '/../../models/index'))
const globalConstants = require(path.join(__dirname, '/../../const/globalConstants'))

const numberFactory = require(path.join(__dirname, '/../factories/panumber'))
const accountFactory = require(path.join(__dirname, '/../factories/account'))

let numberMock

describe('PANumber model', () => {

  before(async () => {
    await models.panumber.destroy({
      where: {}
    })
  })

  beforeEach((done) => {
    accountMock = accountFactory()
    numberMock = numberFactory()
    done()
  })

  it('should create a PA number', async () => {
    let number = await models.panumber.create(numberMock)
    expect(number.dataValues).to.have.property('id')
    expect(number.dataValues.status).eql(globalConstants.DID_AVAILABLE_STATUS)
  })

  it('should fail when creating a number with an already used number', async () => {
    let number1 = await models.panumber.create(numberMock)
    try {
      let number2 = await models.panumber.create(numberMock)
      expect(number2).to.be('undefined')
    } catch (e) {
      expect(e.name).eql('SequelizeUniqueConstraintError')
      expect(e.message).eql('El número ya existe')
    }
  })

  after(async () => {
    await models.panumber.destroy({
      where: {}
    })
  })

})
