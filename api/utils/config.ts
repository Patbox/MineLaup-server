/* eslint-disable no-console */
import path from 'path'
import fs from 'fs'
import configYaml from 'config-yaml'
import chalk from 'chalk'

const configPath = path.resolve(__dirname, '../../storage/config.yml')

export default {
  check() {
    try {
      if (!fs.existsSync(configPath)) {
        console.log(
          chalk.red.bold(
            'The configuration file was not found. Please run the following command to fix it:'
          ) +
            '\n' +
            chalk.italic('npm run config')
        )
        process.exit(0)
      }
    } catch (error) {}
  },
  get() {
    const config = configYaml(configPath)
    return config
  },
}
