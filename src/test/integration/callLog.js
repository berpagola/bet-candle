/*
process.env.ENVIRONMENT = 'test'

const path = require('path')
const chai = require('chai')
let chaiHttp = require('chai-http')
const models = require(path.join(__dirname, '/../../models/index'))
const errors = require(path.join(__dirname, '/../../const/errors'))

let server = require(path.join(__dirname, '/../../app'))
let should = chai.should()

const config = require(path.join(__dirname, '/../../config/index'))

const userFactory = require(path.join(__dirname, '/../factories/usuario'))
const callLogFactory = require(path.join(__dirname, '/../factories/callLog'))

let createdUsuarioData

chai.use(chaiHttp)

describe('Integration - Call Log', () => {

  before(async () => {
    await models.callLog.destroy({
      where: {}
    })
    await models.usuario.destroy({
      where: {}
    })
    let result = await models.usuario.create(userFactory())
    createdUsuarioData = result.dataValues
  })

  describe('POST call log', () => {

    it('should fail when creating a log with an unregistered email', (done) => {
      let newUsuario = userFactory()
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory())
        .set('authorization', newUsuario.email)
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(false)
          res.body.should.have.property('error').to.be.not.empty
          let error = res.body.error
          error.should.have.property('code').eql(errors.UsuarioUnauthorized.code)
          error.should.have.property('message').eql(errors.UsuarioUnauthorized.message)
          done()
        })
    })

    it('should fail when creating a log with missing parameters', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send({})
        .set('authorization', createdUsuarioData.email)
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

    it('should fail when creating a log with an invalid parameter', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory({duration: -100}))
        .set('authorization', createdUsuarioData.email)
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

    it('should fail when creating a log with an out of bound duration value', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory({duration: 999999999999999999999999}))
        .set('authorization', createdUsuarioData.email)
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

    it('should fail when creating a log with an out of bound startTime value', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory({startTime: 999999999999999999999999}))
        .set('authorization', createdUsuarioData.email)
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

    it('should fail when creating a log with an out of bound dataUsed value', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory({dataUsed: 999999999999999999999999}))
        .set('authorization', createdUsuarioData.email)
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

    it('should save the call log', (done) => {
      chai.request(server)
        .post('/calls/log')
        .send(callLogFactory())
        .set('authorization', createdUsuarioData.email)
        .set('X-API-Key', config.apiKey)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(200)
          res.body.should.have.property('success').eql(true)
          res.body.should.have.property('data').to.be.empty
          res.body.should.have.property('message').eql('Log de llamada guardado satisfactoriamente')
          done()
        })
    })
  })

  after(async () => {
    await models.callLog.destroy({
      where: {}
    })
    await models.usuario.destroy({
      where: {}
    })
  })

})
*/