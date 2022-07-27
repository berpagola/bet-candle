/*
process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
let chaiHttp = require('chai-http')
const models = require(path.join(__dirname, '/../../models/index'))
const errors = require(path.join(__dirname, '/../../const/errors'))
const constants = require(path.join(__dirname, '/../../const/globalConstants'))

let server = require(path.join(__dirname, '/../../app'))
let should = chai.should()

const config = require(path.join(__dirname, '/../../config/index'))

const numberFactory = require(path.join(__dirname, '/../factories/number'))
const userFactory = require(path.join(__dirname, '/../factories/usuario'))

let numberMock
let userMock
let assignedNumber

chai.use(chaiHttp)

describe('Integration - Number', () => {

  before(async () => {
    await models.number.destroy({
      where: {}
    })
    await models.usuario.destroy({
      where: {}
    })
    userMock = await models.usuario.create(userFactory())
    assignedNumber = await models.number.create(numberFactory({phoneNumber: 15432147360, state: constants.DID_ACTIVE_STATE}))
    unassignedNumber = await models.number.create(numberFactory({phoneNumber: 78945613254}))
    await assignedNumber.setUsuario(userMock)
  })

  describe('POST number', () => {

    it('should fail when creating a number with missing parameters', (done) => {
      chai.request(server)
        .post('/numbers/')
        .send({'number': {}})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.MissingParameters.code)
          error.should.have.property('message').eql(errors.MissingParameters.message)
          done()
        })
    })

    it('should fail when creating a number with an invalid parameter', (done) => {
      chai.request(server)
        .post('/numbers/')
        .send({'number': numberFactory({'phoneNumber': 'invalid-number'}, false)})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.ValidationError.code)
          error.should.have.property('message').eql(errors.ValidationError.message)
          done()
        })
    })

    it('should create a number', (done) => {
      numberMock = numberFactory({})
      chai.request(server)
        .post('/numbers/')
        .send({'number': numberMock})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.be.empty
          res.body.should.have.property('message').eql('Número creado satisfactoriamente')
          done()
        })
    })

    it('should fail when creating a number with an already registered phone number', (done) => {
      chai.request(server)
        .post('/numbers/')
        .send({'number': numberFactory({'phoneNumber': numberMock.phoneNumber}, false)})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.NumberAlreadyExists.code)
          error.should.have.property('message').eql(errors.NumberAlreadyExists.message)
          done()
        })
    })

    it('should assign a number to a usuario', (done) => {
      chai.request(server)
        .post('/numbers/assign')
        .send({'phoneNumber': numberMock.phoneNumber, 'userId': userMock.id})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.be.empty
          res.body.should.have.property('message').eql('Número asignado satisfactoriamente')
          done()
        })
    })

    it('should fail when assigning a number which is already assigned', (done) => {
      chai.request(server)
        .post('/numbers/assign')
        .send({'phoneNumber': assignedNumber.phoneNumber, 'userId': userMock.id})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.NumberAlreadyAssigned.code)
          error.should.have.property('message').eql(errors.NumberAlreadyAssigned.message)
          done()
        })
    })

    it('should fail when assigning an invalid number', (done) => {
      chai.request(server)
        .post('/numbers/assign')
        .send({'phoneNumber': 51234567890, 'userId': userMock.id})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.NumberNotFound.code)
          error.should.have.property('message').eql(errors.NumberNotFound.message)
          done()
        })
    })

    it('should fail when assigning an invalid usuario', (done) => {
      numberMock = numberFactory()
      chai.request(server)
        .post('/numbers/assign')
        .send({'phoneNumber': unassignedNumber.phoneNumber, 'userId': 'a328273f-e594-46b6-94de-2ed4fe1386ef'})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.UsuarioNotFound.code)
          error.should.have.property('message').eql(errors.UsuarioNotFound.message)
          done()
        })
    })

    it('should validate an active number', (done) => {
      chai.request(server)
        .post('/numbers/validate')
        .send({'phoneNumber': assignedNumber.phoneNumber})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.have.property('usuario')
          res.body.data.usuario.should.have.property('sip_username')
          res.body.should.have.property('data').to.have.property('number')
          res.body.data.number.should.have.property('phone_number')
          res.body.should.have.property('message').eql('Número válido')
          done()
        })
    })

    it('should fail when validating an inactive number', (done) => {
      numberMock = numberFactory()
      chai.request(server)
        .post('/numbers/validate')
        .send({'phoneNumber': unassignedNumber.phoneNumber})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.NumberNotActive.code)
          error.should.have.property('message').eql(errors.NumberNotActive.message)
          done()
        })
    })

    it('should fail when validating an invalid number', (done) => {
      chai.request(server)
        .post('/numbers/validate')
        .send({'phoneNumber': 51234567890})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.NumberNotFound.code)
          error.should.have.property('message').eql(errors.NumberNotFound.message)
          done()
        })
    })

  })

  after(async () => {
    await models.number.destroy({
      where: {}
    })
    await models.usuario.destroy({
      where: {}
    })
  })

})
*/