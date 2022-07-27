process.env.ENVIRONMENT = 'test'

const path = require('path')
const expect = require('chai').expect
const models = require(path.join(__dirname, '/../../models/index'))
const globalConstants = require(path.join(__dirname, '/../../const/globalConstants'))

const cardFactory = require(path.join(__dirname, '/../factories/card'))

let cardMock

describe('Card model', () => {

  before(async () => {
    await models.card.destroy({
      where: {}
    })
  })

  beforeEach((done) => {
    cardMock = cardFactory()
    done()
  })

  it('should create a card', async () => {
    let card = await models.card.create(cardMock)
    expect(card.dataValues).to.have.property('id')
  })

  it('should fail when creating a number with an already generated PIN', async () => {
    let card1 = await models.card.create(cardMock)
    try {
      let card2 = await models.card.create(cardMock)
      expect(card2).to.be('undefined')
    } catch (e) {
      expect(e.name).eql('SequelizeUniqueConstraintError')
      expect(e.message).eql('El PIN ya existe')
    }
  })

  after(async () => {
    await models.card.destroy({
      where: {}
    })
  })

})
