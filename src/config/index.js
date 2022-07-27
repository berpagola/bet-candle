// Default configuration
let config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  operatorsAliases: false,
  define: {
    timestamps: true
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 100000
  },
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailAddress: process.env.GOOGLE_MAIL_ADDRESS,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  environment: process.env.ENVIRONMENT
}

// Add custom configuration depending on the environment
switch (process.env.ENVIRONMENT) {
  case 'production':
    config = {...config, ...require('./production')}
    break
  case 'staging':
    config = {...config, ...require('./staging')}
    break
  case 'development':
    config = {...config, ...require('./development')}
    break
  case 'test':
    config = {...config, ...require('./test')}
    break
}

module.exports = config
