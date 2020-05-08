import path from 'path'
import fs from 'fs'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import configYaml from 'config-yaml'
import chalk from 'chalk'
import { UserRole } from '../types/UserRole'
import router from './routers'
import config from './utils/config'
import sequelize from './models'
import User from './models/User.model'

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
 * Sync the sequelize database
 */
sequelize.sync().then(async () => {
  /**
   * Check for the admin user
   */
  // eslint-disable-next-line no-console
  console.log(await User.count())
  if ((await User.count()) === 0) {
    const userConfigPath = path.resolve(__dirname, '../storage/user.yml')
    /**
     * Is the config file exist ?
     */
    if (!fs.existsSync(userConfigPath)) {
      // eslint-disable-next-line no-console
      console.log(
        chalk.red.bold(
          'The configuration file was not found. Please run the following command to fix it:'
        ) +
          '\n' +
          chalk.italic('npm run create-user')
      )
      process.exit(0)
    }

    /**
     * Create the user
     */
    const userConfig = configYaml(userConfigPath)
    const adminUser = new User({
      username: userConfig.username,
      password: userConfig.password,
      role: UserRole.user,
      language: userConfig.language,
    })

    await adminUser.save()

    /**
     * Delete the config file
     */
    fs.unlinkSync(userConfigPath)
  }

  /**
   * Registering routes
   */
  router(app)
})

export default {
  path: '/api',
  handler: app,
}
