import express, { Application } from 'express'
import bodyParser from 'body-parser'
import router from './routers'
import config from './utils/config'
import sequelize from './models'

/**
 * Check configuration exists
 */
config.check()

const app: Application = express()

app.use(
  bodyParser.json({
    limit: '50mb',
  })
)

/**
 * Registering routes
 */
router(app)

/**
 * Sync the sequelize database
 */
if (config.get().database.type) {
  sequelize.sync()
}

export default {
  path: '/api',
  handler: app,
}
