/*
process.env.ENVIRONMENT = 'test'

const path = require('path')
let sinon = require('sinon')
let authentication = require(path.join(__dirname, '/../../middlewares/authentication'))
const expect = require('chai').expect
const models = require(path.join(__dirname, '/../../models/index'))
const errors = require(path.join(__dirname, '/../../const/errors'))

const userFactory = require(path.join(__dirname, '/../factories/usuario'))

let createdUsuarioData, req, nextSpy

describe('Authentication middleware', () => {

  before(async () => {
    await models.usuario.destroy({
      where: {}
    })
    let result = await models.usuario.create(userFactory())
    createdUsuarioData = result.dataValues
  })

  beforeEach((done) => {
    nextSpy = sinon.spy()
    req = {headers: {}}
    done()
  })

  it('should pass when email is valid and belongs to a registered usuario', async () => {
    req.headers.authorization = createdUsuarioData.email
    await authentication.validateEmail(req, {}, nextSpy)
    expect(nextSpy.called).to.be.true
    expect(nextSpy.getCall(0).args[0]).to.not.exist
  })

  it('should call next with an error when authorization header is not present', async () => {
    await authentication.validateEmail(req, {}, nextSpy)
    expect(nextSpy.called).to.be.true
    expect(nextSpy.getCall(0).args[0]).to.exist
    expect(nextSpy.getCall(0).args[0]).to.be.eql(errors.UsuarioUnauthorized)
  })

  it('should call next with an error when the email format is invalid', async () => {
    req.headers.authorization = 'asd123'
    await authentication.validateEmail(req, {}, nextSpy)
    expect(nextSpy.called).to.be.true
    expect(nextSpy.getCall(0).args[0]).to.exist
    expect(nextSpy.getCall(0).args[0]).to.be.eql(errors.UsuarioUnauthorized)
  })

  it('should call next with an error when the email does not belong to a registered usuario', async () => {
    req.headers.authorization = 'asd@123.com'
    await authentication.validateEmail(req, {}, nextSpy)
    expect(nextSpy.called).to.be.true
    expect(nextSpy.getCall(0).args[0]).to.exist
    expect(nextSpy.getCall(0).args[0]).to.be.eql(errors.UsuarioUnauthorized)
  })

  after(async () => {
    await models.usuario.destroy({
      where: {}
    })
  })

})
*/