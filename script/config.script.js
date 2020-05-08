/* eslint-disable no-console */

const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const Memiens = require('memiens').default
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const config = path.resolve(__dirname, '../storage/config.yml')

async function run() {
  try {
    console.log(
      chalk.green(
        figlet.textSync('MineLaup Server\nconfiguration', {
          font: 'Small',
          verticalLayout: 'fitted',
        })
      ),
      '\n\n'
    )

    if (fs.existsSync(config)) {
      console.log(
        chalk.bold.red(
          'This process will overwrite the current configuration. are you sure that you want to continue ?'
        )
      )
      const response = await inquirer.prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Continue ?',
        default: false,
      })

      if (!response.continue) {
        console.log(chalk.red('Process canceled by user.'))
        process.exit(0)
      }

      fs.unlinkSync(config)
    }

    const dbList = {
      SQLite: 'sqlite',
      MySQL: 'mysql',
      MariaDB: 'mariadb',
      PostgreSQL: 'psql',
      'Microsoft SQL': 'mssql',
    }

    const databaseResponse = await inquirer.prompt([
      {
        name: 'db_type',
        type: 'list',
        message: 'Database type ?',
        choices: Object.keys(dbList),
        default: 0,
      },
      {
        name: 'db_name',
        type: 'input',
        message: 'Database name ?',
        default: 'minelaup',
        validate: (value) => {
          return value.length > 0
        },
      },
    ])

    const settings = new Memiens(
      path.resolve(__dirname, '../storage/config.yml')
    )

    settings.set('database.type', dbList[databaseResponse.db_type])
    settings.set('database.name', databaseResponse.db_name)

    if (dbList[databaseResponse.db_type] === 'sqlite') {
      const dbConfigResponse = await inquirer.prompt({
        name: 'db_path',
        type: 'input',
        message: 'Database path ? (Can be relative)',
        default: `./storage/${databaseResponse.db_name}.sqlite`,
        validate: (value) => {
          return fs.existsSync(path.dirname(path.resolve(value)))
        },
      })

      settings.set('database.path', dbConfigResponse.db_path)
    } else {
      const dbConfigResponse = await inquirer.prompt([
        {
          name: 'db_host',
          type: 'input',
          message: 'Database host ?',
          default: 'localhost',
        },
        {
          name: 'db_host',
          type: 'input',
          message: 'Database port ? (empty to let by default)',
        },
        {
          name: 'db_user',
          type: 'input',
          message: 'Database username ?',
          default: 'minelaup',
        },
        {
          name: 'db_password',
          type: 'password',
          message: 'Database password ?',
        },
      ])

      settings.set('database.host', dbConfigResponse.db_host)
      settings.set('database.user', dbConfigResponse.db_user)
      settings.set('database.password', dbConfigResponse.db_password)
    }

    const hash = await crypto.randomBytes(512).toString('hex')
    settings.set('jwt_token', hash)

    console.log(
      '\n\n' +
        chalk.green.bold(
          'The configuration has been generated and can be found at:\n'
        ) +
        config +
        '\n\n' +
        chalk.bold('Have a good day ! 👍')
    )
  } catch (error) {
    console.error(error)
  }
}

run()
