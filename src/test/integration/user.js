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

const userFactory = require(path.join(__dirname, '/../factories/usuario'))
const numberFactory = require(path.join(__dirname, '/../factories/number'))

let userMock
let activeUsuario
let invalidUsuario
let assignedNumber

chai.use(chaiHttp)

describe('Integration - Usuario', () => {

  before(async () => {
    await models.usuario.destroy({
      where: {}
    })
    await models.number.destroy({
      where: {}
    })
    activeUsuario = await models.usuario.create(userFactory({}, true))
    invalidUsuario = await models.usuario.create(userFactory({}, true))
    assignedNumber = await models.number.create(numberFactory({phoneNumber: 15432147360, state: constants.DID_ACTIVE_STATE}))
    await assignedNumber.setUsuario(activeUsuario)
  })

  describe('POST usuario', () => {

    it('should fail when creating a usuario with missing parameters', (done) => {
      chai.request(server)
        .post('/usuarios/')
        .send({usuario: {}})
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

    it('should fail when creating a usuario with an invalid parameter', (done) => {
      chai.request(server)
        .post('/usuarios/')
        .send({'usuario': userFactory({'email': 'invalid-email'}, false)})
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

    it('should create a usuario', (done) => {
      userMock = userFactory({}, false)
      chai.request(server)
        .post('/usuarios/')
        .send({'usuario': userMock})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.be.empty
          res.body.should.have.property('message').eql('Usuario creado satisfactoriamente')
          done()
        })
    })

    it('should retrieve the created usuario information with the generated SIP credentials', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({'usuario': {'email': userMock.email, 'password': userMock.password}})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.not.be.empty
          let data = res.body.data
          data.should.have.property('sipUsuarioname').to.not.be.empty
          data.should.have.property('sipPassword').to.not.be.empty
          userMock = res.body.data
          done()
        })
    })

    it('should fail when creating a usuario with an already registered email', (done) => {
      chai.request(server)
        .post('/usuarios/')
        .send({'usuario': userFactory({'email': userMock.email}, false)})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.UsuarioAlreadyExists.code)
          error.should.have.property('message').eql(errors.UsuarioAlreadyExists.message)
          done()
        })
    })

    it('should validate an active usuario', (done) => {
      chai.request(server)
        .post('/usuarios/validate')
        .send({'username': activeUsuario.sipUsuarioname})
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

    it('should fail when validating an usuario that does not have a number', (done) => {
      numberMock = numberFactory()
      chai.request(server)
        .post('/usuarios/validate')
        .send({'username': invalidUsuario.sipUsuarioname})
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.UsuarioNotHaveNumber.code)
          error.should.have.property('message').eql(errors.UsuarioNotHaveNumber.message)
          done()
        })
    })

    it('should fail when validating an invalid usuario', (done) => {
      chai.request(server)
        .post('/usuarios/validate')
        .send({'username': 'a328273f-e594-46b6-94de-2ed4fe1386ef'})
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

  })

  after(async () => {
    await models.usuario.destroy({
      where: {}
    })
    await models.number.destroy({
      where: {}
    })
  })

})
*/