const { google } = require('googleapis')
const nodemailer = require('nodemailer')
const OAuth2 = google.auth.OAuth2
const config = require('../config/index')

const oauth2Cliente = new OAuth2(
  config.googleClienteId,
  config.googleClienteSecret,
  "https://developers.google.com/oauthplayground"
)

oauth2Cliente.setCredentials({
  refresh_token: config.googleRefreshToken
})

module.exports = {
  send: async function(to, subject, html) {
    const headers = await oauth2Cliente.getRequestHeaders()
    const accessToken = headers.Authorization.split(' ')[1]
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        usuario: config.mailAddress, 
        clienteId: config.googleClienteId,
        clienteSecret: config.googleClienteSecret,
        refreshToken: config.googleRefreshToken,
        accessToken: accessToken
      }
    })

    const mailOptions = {
      from: config.mailAddress,
      to: to,
      subject: subject,
      generateTextFromHTML: true,
      html: html
    }

    const response = await smtpTransport.sendMail(mailOptions)
    smtpTransport.close()

    return response
  }
}